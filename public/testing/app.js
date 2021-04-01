const googleSignInBtn = document.getElementById("googleSignIn")

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyD7A0QItV-e6sWIh-hVxvf9mIbzSqiSwTk',
    authDomain: 'learningames-30ee8.firebaseapp.com',
    projectId: 'learningames-30ee8'
});

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user; // user is undefined if no user signed in
    console.log(user)
    document.getElementById("header").innerHTML = `Logged in as: ${user.displayName}`
    document.getElementById("profile").src = user.photoURL

   });

function signInWithGoogle() {
    var user = firebase.auth().currentUser;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        document.getElementById("header").innerHTML = `Logged in as: ${user.displayName}`
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

googleSignInBtn.addEventListener("click", signInWithGoogle)