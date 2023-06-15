import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW8VduFyPvTOW2SOG2ofbNyIFIIA3n9Tg",
  authDomain: "e-commerce-4a5f8.firebaseapp.com",
  projectId: "e-commerce-4a5f8",
  storageBucket: "e-commerce-4a5f8.appspot.com",
  messagingSenderId: "490152716432",
  appId: "1:490152716432:web:eff9355219baa79f51d015",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
