// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByoGmJcwJmRZcRSoQXDDY8CxXlcrihKNQ",
  authDomain: "mini-hakathon-289c6.firebaseapp.com",
  projectId: "mini-hakathon-289c6",
  storageBucket: "mini-hakathon-289c6.appspot.com",
  messagingSenderId: "407761378172",
  appId: "1:407761378172:web:2eb20076c464f0eb2062f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

export {auth , database }