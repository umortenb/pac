import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFdCxIUS6WcbXmbstiXmSTNMzP_d291ro",
  authDomain: "pach-59e77.firebaseapp.com",
  projectId: "pach-59e77",
  storageBucket: "pach-59e77.appspot.com",
  messagingSenderId: "423924148902",
  appId: "1:423924148902:web:412af0dd2e575781852267",
  measurementId: "G-8QSJVH54SG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db };
export { auth };
