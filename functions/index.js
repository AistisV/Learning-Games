// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { write } = require("firebase-functions/lib/logger");
admin.initializeApp();
const db = admin.firestore();

exports.test = functions.https.onCall(async (data, context) => {
  const writeResult = await admin.firestore().collection('users').add({ epic: data.text });

  return {
    sup: data.text,
    id: writeResult.id
  };
});
