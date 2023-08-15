import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFtndG1D4e6zAA225RH3rsunTuVPHwdOs",
  authDomain: "kitchatt-app-rn.firebaseapp.com",
  projectId: "kitchatt-app-rn",
  storageBucket: "kitchatt-app-rn.appspot.com",
  messagingSenderId: "905478944661",
  appId: "1:905478944661:web:c349a51961133ec737689c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestoreAuth = getAuth(app);
const firestoreDB = getFirestore(app);
export { app, firestoreAuth, firestoreDB };
