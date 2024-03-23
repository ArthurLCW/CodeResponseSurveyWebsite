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
  const resultsResponse = await axios({
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/batch`,
    params: {
      tokens: tokens,
      base64_encoded: "false",
      fields: "token,status,stdout,stderr,time,memory,expected_output",
    },
    headers: {
      "X-RapidAPI-Key": "bb786781e0msh2e4db7b948b9ea5p129e38jsn59326084eee0",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  });

  const allDone = resultsResponse.data.submissions.every(
    (sub) => sub.status.id !== 1 && sub.status.id !== 2
  );

  console.log(allDone, resultsResponse);
  if (!allDone) {
    // If any submission is still in queue or processing, wait for some time and then check again.
    setTimeout(() => checkResults(buttonName, tokens, callback), 3000); // Check again after 3 seconds
  } else {
    callback(resultsResponse.data.submissions);
    pushObjectToSessionArray(
      buttonName + "Records",
      resultsResponse.data.submissions
    );
  }
};

const executeBatch = async (buttonName, submissions, callback) => {
  console.log("executeBatch submissions: ", submissions);
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
        "X-RapidAPI-Key": "bb786781e0msh2e4db7b948b9ea5p129e38jsn59326084eee0",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        submissions: submissionData,
      },
    });

    const tokens = submitResponse.data.map((sub) => sub.token).join(",");
    console.log(submitResponse, tokens);

    // Initially check the results
    checkResults(buttonName, tokens, callback);
  } catch (error) {
    console.error(error);
  } finally {
  }
};

export default executeBatch;
