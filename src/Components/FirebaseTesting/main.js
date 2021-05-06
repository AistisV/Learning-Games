import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { FirestoreProvider, FirestoreDocument, FirestoreCollection } from "@react-firebase/firestore";


const config = {
  apiKey: "AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk",
  authDomain: "learningames-30ee8.firebaseapp.com",
  databaseURL: "https://learningames-30ee8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learningames-30ee8",
  storageBucket: "learningames-30ee8.appspot.com",
  messagingSenderId: "458085932103",
  appId: "1:458085932103:web:5cf20caeda2145a76e2562",
  measurementId: "G-Y29RLVM4XM"
};

// export default function FirebaseTest(){
//   return (
//     <FirebaseAuthProvider {...config} firebase={firebase}>
//       <div>
//         <button
//           onClick={() => {
//             const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//             firebase.auth().signInWithPopup(googleAuthProvider);
//           }}
//         >
//           Sign In with Google
//         </button>
//         <button
//           data-testid="signin-anon"
//           onClick={() => {
//             firebase.auth().signInAnonymously();
//           }}
//         >
//           Sign In Anonymously
//         </button>
//         <button
//           onClick={() => {
//             firebase.auth().signOut();
//           }}
//         >
//           Sign Out
//         </button>
//         <FirebaseAuthConsumer>
//           {({ isSignedIn, user, providerId }) => {
//             return (
//               <pre style={{ height: 300, overflow: "auto" }}>
//                 {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
//               </pre>
//             );
//           }}
//         </FirebaseAuthConsumer>
//         <div>
//           <IfFirebaseAuthed>
//             {() => {
//               return <div>You are authenticated</div>;
//             }}
//           </IfFirebaseAuthed>
//           <IfFirebaseAuthedAnd
//             filter={({ providerId }) => providerId !== "anonymous"}
//           >
//             {({ providerId }) => {
//               return <div>You are authenticated with {providerId}</div>;
//             }}
//           </IfFirebaseAuthedAnd>
//         </div>
//       </div>
//     </FirebaseAuthProvider>
//   );
// };

export default function FirebaseTest() {

  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <FirestoreCollection path="/answers/" limit={5}>
        {d => {
          return d.isLoading ? "Loading" : <pre>{JSON.stringify(d.value[0].sup)}</pre>;
        }}
      </FirestoreCollection>
    </FirestoreProvider>
  )

}