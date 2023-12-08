import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBFROSYebvyH9wYwIPvl2AeiCFkPPpvv-8",
  authDomain: "survey-backend-70299.firebaseapp.com",
  databaseURL: "https://survey-backend-70299-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "survey-backend-70299",
  storageBucket: "survey-backend-70299.appspot.com",
  messagingSenderId: "83445893881",
  appId: "1:83445893881:web:05487533d16000c520b028",
  measurementId: "G-NGL342BKBL"
};

const firebaseApp = initializeApp(firebaseConfig);

const userData = {
  name: "John Doe",
  age: 30,
  isAdmin: false
};

const userIdKey = "someUserId";

const writeParticipantData = (userId=userIdKey, myData=userData, app=firebaseApp) => {
  console.log("userId:", userId, "myData:", myData);
  const database = getDatabase(app);
  const dataRef = ref(database, 'participants/' + userId);
  set(dataRef, myData)
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.error("Failed to write data", error);
    });
};

export {writeParticipantData};