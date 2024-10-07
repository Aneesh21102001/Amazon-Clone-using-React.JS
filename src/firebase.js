// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB-f63QYJ_mbHhqcbG2c7SACPOxZrogncY",
  authDomain: "clone-5da2c.firebaseapp.com",
  projectId: "clone-5da2c",
  storageBucket: "clone-5da2c.appspot.com",
  messagingSenderId: "64725500834",
  appId: "1:64725500834:web:614767ff704272cc5ea8fb",
  measurementId: "G-QBKHJCKYF4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);  // Ensure this is correctly imported and set up

// Initialize Auth
const auth = getAuth(firebaseApp);

export { db, auth };
