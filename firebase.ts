// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB-KTv7bBVNHlJo6B0y1-lwzUwR4ZXIhU",
  authDomain: "netfix-nextjs.firebaseapp.com",
  projectId: "netfix-nextjs",
  storageBucket: "netfix-nextjs.appspot.com",
  messagingSenderId: "963013730403",
  appId: "1:963013730403:web:cf3adb2d0be8ee048f1856",
  measurementId: "G-P1MWKQ0GQV",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
export default app;
export { auth, db };
