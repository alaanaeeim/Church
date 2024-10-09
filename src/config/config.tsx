// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-TJqRchnTCAmr9kI6e_27MBh9Iiaq6oc",
  authDomain: "church-378c8.firebaseapp.com",
  projectId: "church-378c8",
  storageBucket: "church-378c8.appspot.com",
  messagingSenderId: "758062370479",
  appId: "1:758062370479:web:d40e40d750dc59e1644e5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


