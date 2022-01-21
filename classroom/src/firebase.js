// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLkbaJVkrs48UTV5kMDN1VyKtRvC3IYUo",
  authDomain: "classroom-authentication.firebaseapp.com",
  projectId: "classroom-authentication",
  storageBucket: "classroom-authentication.appspot.com",
  messagingSenderId: "346571448968",
  appId: "1:346571448968:web:caf1cb3c722d11c4c7353d",
  measurementId: "G-VYBLFNQPP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;