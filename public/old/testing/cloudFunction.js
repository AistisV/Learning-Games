const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

firebase.initializeApp({
  apiKey: "AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk",
  authDomain: "learningames-30ee8.firebaseapp.com",
  projectId: "learningames-30ee8",
});

var db = firebase.firestore();
docRef = db.collection("questions").doc(id);

docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      let data = doc.data();
      console.log(data);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
