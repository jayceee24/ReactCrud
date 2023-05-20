// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8SbVyKuc4pugp2jWZQaayhzSmwRiyKTk",
  authDomain: "webact1.firebaseapp.com",
  databaseURL: "https://webact1-default-rtdb.firebaseio.com",
  projectId: "webact1",
  storageBucket: "webact1.appspot.com",
  messagingSenderId: "585612216079",
  appId: "1:585612216079:web:612fd5bfab13d02900a07a",
  measurementId: "G-TNH5P0PE1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)