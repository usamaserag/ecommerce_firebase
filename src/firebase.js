import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";


// TODO: move to .env file
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "e-commerce-4a5f8.firebaseapp.com",
  projectId: "e-commerce-4a5f8",
  storageBucket: "e-commerce-4a5f8.appspot.com",
  messagingSenderId: "490152716432",
  appId: "1:490152716432:web:eff9355219baa79f51d015",
};

firebase.initializeApp(firebaseConfig);

// Initialize Storage using compat
const storage = firebase.storage();

export const imageDb = storage; // Export the initialized storage

export default firebase;
