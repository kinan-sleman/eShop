// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKbup8f4jEcB-kSkN0Stuu4daEXRWpr2g",
    authDomain: "eshop-c8eae.firebaseapp.com",
    projectId: "eshop-c8eae",
    storageBucket: "eshop-c8eae.firebasestorage.app",
    messagingSenderId: "259625029671",
    appId: "1:259625029671:web:dcd3f14ce812139158fe02",
    measurementId: "G-HSLVBWNP1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}