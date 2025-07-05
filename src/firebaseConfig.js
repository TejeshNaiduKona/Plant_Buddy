// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Google API Key",
  authDomain: "domain.firebaseapp.com",
  projectId: "plantbuddy-1",
  storageBucket: "domain.firebasestorage.app",
  messagingSenderId: "1060448052790",
  appId: "1:1060448052790:web:78311e2b200911f5779a97",
  measurementId: "G-EPRE6TXW4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };
