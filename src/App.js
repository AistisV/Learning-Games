import React from "react";
import { Route } from "react-router-dom";
import Snake from "./snake/snake";
import InputNew from './Components/QuestionInput/inputnew';
import Dashboard from './Components/Dashboard/Dashboard';
import FirebaseTest from './Components/FirebaseTesting/main';
import Home from './Components/Home/Home'
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk",
  authDomain: "learningames-30ee8.firebaseapp.com",
  databaseURL: "https://learningames-30ee8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learningames-30ee8",
  storageBucket: "learningames-30ee8.appspot.com",
  messagingSenderId: "458085932103",
  appId: "1:458085932103:web:5cf20caeda2145a76e2562",
  measurementId: "G-Y29RLVM4XM"
});

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/snake" component={Snake} />
      <Route exact path="/inputnew" component={InputNew} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/firebase" component={FirebaseTest} />
    </div>
  );
}

export default App;
