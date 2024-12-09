// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4PsOXsAtZYR1Jaof7Ro7GtaltISzjxDM",
  authDomain: "clone-group-4.firebaseapp.com",
  projectId: "clone-group-4",
  storageBucket: "clone-group-4.firebasestorage.app",
  messagingSenderId: "692315573962",
  appId: "1:692315573962:web:288e7d0db1348556ac6e33",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = firebase.firestore()