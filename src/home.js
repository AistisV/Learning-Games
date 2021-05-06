import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

// const firebase = require("firebase").default;
// // Required for side-effects
// require("firebase/functions").default;

// firebase.initializeApp({
//   apiKey: "AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk",
//   authDomain: "learningames-30ee8.firebaseapp.com",
//   databaseURL: "https://learningames-30ee8-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "learningames-30ee8",
//   storageBucket: "learningames-30ee8.appspot.com",
//   messagingSenderId: "458085932103",
//   appId: "1:458085932103:web:5cf20caeda2145a76e2562",
//   measurementId: "G-Y29RLVM4XM"
// });
// // Initialize Cloud Functions through Firebase
// var functions = firebase.functions();

// var test = firebase.functions().httpsCallable('test');
// test({ text: "yo" })
//   .then((result) => {
//     // Read result of the Cloud Function.
//     console.log(result.data.sup + " ---- " + result.data.id);
//   });

function Home() {
  return (
    <div>
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default Home;
