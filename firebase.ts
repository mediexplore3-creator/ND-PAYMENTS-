// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdYmmIyZji_Gjk8j83pyCfEurKx-9Ulyo",
  authDomain: "nd-payments-3095d.firebaseapp.com",
  projectId: "nd-payments-3095d",
  storageBucket: "nd-payments-3095d.firebasestorage.app",
  messagingSenderId: "423289635781",
  appId: "1:423289635781:web:39cd67aa5c2146266901ac",
  measurementId: "G-M4YKK2CX49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, onAuthStateChanged, signOut };
