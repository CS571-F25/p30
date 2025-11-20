// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// my firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAcLEP1ySya2UMc8MeNVMowBm3kpvkWels",
    authDomain: "cs571-stock.firebaseapp.com",
    projectId: "cs571-stock",
    storageBucket: "cs571-stock.firebasestorage.app",
    messagingSenderId: "924762109652",
    appId: "1:924762109652:web:59f07b817245851a00ad41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Authentication (if you need it later)
export const auth = getAuth(app);

export default app;

