import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ1SisHSsl0TO1I80GrfjfIkx6O_MnnlI",
    authDomain: "fikishwa-d07c9.firebaseapp.com",
    projectId: "fikishwa-d07c9",
    storageBucket: "fikishwa-d07c9.firebasestorage.app",
    messagingSenderId: "1011474116915",
    appId: "1:1011474116915:web:be3792b5abb675248ece46",
    measurementId: "G-H84W23Y077",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
