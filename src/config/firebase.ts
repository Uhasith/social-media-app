// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC307GV5YEifNf7z8EEsjG7uwV7YkpCIz8",
  authDomain: "social-media-app-1e9a7.firebaseapp.com",
  projectId: "social-media-app-1e9a7",
  storageBucket: "social-media-app-1e9a7.appspot.com",
  messagingSenderId: "80425535301",
  appId: "1:80425535301:web:a2dd19c88528fc7f48e02c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);