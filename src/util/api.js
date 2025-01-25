import axios from "axios";

function pushObjectToSessionArray(key, newObj) {
  const existing = sessionStorage.getItem(key);

  let array;
  if (existing) {
    array = JSON.parse(existing);
  } else {
    array = [];
  }

  array.push(newObj);
  sessionStorage.setItem(key, JSON.stringify(array));
}

const checkResults = async (buttonName, tokens, callback) => {
  try {
    const resultsResponse = await axios({
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/batch`,
      params: {
        tokens: tokens,
        base64_encoded: "false",
        fields: "token,status,stdout,stderr,time,memory,expected_output",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    });

    const allDone = resultsResponse.data.submissions.every(
      (sub) => sub.status.id !== 1 && sub.status.id !== 2
    );

    // console.log(allDone, resultsResponse);
    if (!allDone) {
      setTimeout(() => checkResults(buttonName, tokens, callback), 3000);
    } else {
      callback(resultsResponse.data.submissions);
      pushObjectToSessionArray(
        buttonName + "Records" + sessionStorage.getItem("currentPage"),
        resultsResponse.data.submissions
      );
    }
  } catch (error) {
    // console.log(error);
    console.error("Error fetching results:", error);
    const errorDataArray = [];
    const errorDataObj = {
      expected_output: undefined,
      memory: undefined,
      status: {
        id: -1,
        description: "Unknown Error",
      },
      stderr:
        error.response.data.error ||
        "Unknown error occured, possibly internet failure or non-English identifiers in code. Please try again",
      stdout: undefined,
      time: undefined,
      token: tokens,
    };
    errorDataArray.push(errorDataObj);
    callback(errorDataArray);
    pushObjectToSessionArray(
      buttonName + "Records" + sessionStorage.getItem("currentPage"),
      errorDataArray
    );
  }
};

const executeBatch = async (buttonName, submissions, callback) => {
  // console.log("executeBatch submissions: ", submissions);
  const submissionData = submissions.map((submission) => ({
    language_id: submission.language_id,
    source_code: submission.source_code,
    stdin: submission.stdin,
    expected_output: submission.expected_output,
  }));

  try {
    const submitResponse = await axios({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        submissions: submissionData,
      },
    });

    const tokens = submitResponse.data.map((sub) => sub.token).join(",");
    // console.log(submitResponse, tokens);

    // Initially check the results
    checkResults(buttonName, tokens, callback);
  } catch (error) {
    // console.log(error);
    console.error("Error fetching results:", error);
    const errorDataArray = [];
    const errorDataObj = {
      expected_output: undefined,
      memory: undefined,
      status: {
        id: -1,
        description: "Unknown Error",
      },
      stderr:
        error.response.data.error ||
        "Unknown error occured, possibly internet failure or non-English identifiers in code. Please try again",
      stdout: undefined,
      time: undefined,
      token: "have not get a token yet",
    };
    errorDataArray.push(errorDataObj);
    callback(errorDataArray);
    pushObjectToSessionArray(
      buttonName + "Records" + sessionStorage.getItem("currentPage"),
      errorDataArray
    );
  } finally {
  }
};

export default executeBatch;
