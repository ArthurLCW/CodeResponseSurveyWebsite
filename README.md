# Survey Web Application

## Introduction

This is the source code for the survey web utilized in the research " Do Comments and Expertise Still Matter? A Controlled Experiment on Programmers’ Adoption of AI-Generated Code ". This survey app allows participants to answer multiple-choice questions and code in a fully functional web code editor.

This project uses React as the front end, Google Firebase Realtime Database as the backend, and Judge0 CE API for code execution.

## Demo

See this website: [https://survey.changwen-software-engineering.xyz/](https://survey.changwen-software-engineering.xyz/)

## Prerequisites

1. NPM, preferred version: 8.5.0
2. JavaScript, preferred version: v16.14.2
3. git
4. A Firebase account with access to the Realtime Database.
5. A Rapid API account with access to Judge0 CE API.

## Setup

1. clone the project

2. Create a `.env` file under the root, add port number add Rapid API key to it:

   ```bash
   PORT=3001
   REACT_APP_API_KEY=`$(Your Rapid API key)`
   ```

3. Create a `firebaseConfig.js` file under the directory `src/util`, the file looks like:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project-authdomain.firebaseapp.com",
     databaseURL: "https://your-database-url.firebaseio.com",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id",
   };

   export default firebaseConfig;
   ```

4. Install all the dependencies: `npm install`

5. Execute project in development mode: `npm start`; Execute project in production mode: `npm run build`, `serve -s build`
