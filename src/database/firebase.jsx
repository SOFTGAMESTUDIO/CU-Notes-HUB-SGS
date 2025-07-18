// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { getStorage } from "firebase/storage";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_SGS,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_SGS,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_SGS,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_SGS,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_SGS,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_SGS,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Assuming you have initialized Firebase Storage in your app


export  {auth, db ,fireDB, sendPasswordResetEmail,storage };


