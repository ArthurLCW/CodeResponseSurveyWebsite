import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const userData = {
  name: "John Doe",
  age: 30,
  isAdmin: false,
};

const userIdKey = "someUserId";

const writeParticipantData = (
  userId = userIdKey,
  myData = userData,
  app = firebaseApp
) => {
  const batch = myData["batch"] || "unknown";
  const project = myData["project"] || "unknown";

  // console.log("userId:", userId, "myData:", myData);

  const database = getDatabase(app);
  const dataRef = ref(database, `${project}/${batch}/${userId}`);
  set(dataRef, myData)
    .then(() => {
      // console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Failed to write data", error);
    });
};

export { writeParticipantData };
