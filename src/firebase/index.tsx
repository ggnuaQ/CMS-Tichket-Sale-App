import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC36BxV5P0x8R4TrJ5LC7CUCkB6nkhtLNE",
  authDomain: "data-insight-2eef3.firebaseapp.com",
  projectId: "data-insight-2eef3",
  storageBucket: "data-insight-2eef3.appspot.com",
  messagingSenderId: "227465859203",
  appId: "1:227465859203:web:0cd601578af30184930bb6",
  measurementId: "G-KLKD8P4PK6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;

