import React from "react";
import { Route } from "react-router-dom";
import Snake from "./snake/snake";
import InputNew from './Components/QuestionInput/inputnew';
import Dashboard from './Components/Dashboard/Dashboard';
import FirebaseTest from './Components/FirebaseTesting/main';
import Home from './Components/Home/Home'
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "",
  authDomain: "learningames-30ee8.firebaseapp.com",
  databaseURL: "",
  projectId: "learningames-30ee8",
  storageBucket: "learningames-30ee8.appspot.com",
  messagingSenderId: "",
  appId: "",
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
