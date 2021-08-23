import firebase from "firebase";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANOj5Pl1MswinD17cdcz2U4w8Slr3uxk0",
  authDomain: "dariye.firebaseapp.com",
  projectId: "dariye",
  storageBucket: "dariye.appspot.com",
  messagingSenderId: "501169495191",
  appId: "1:501169495191:web:4ae62d8c6970c3bfdb5dd2",
  measurementId: "G-PPJTGQJYCL",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const storage = firebase.storage();

const auth = firebase.auth();

export { db, storage, auth };
