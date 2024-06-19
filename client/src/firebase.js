// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dec18.firebaseapp.com",
  projectId: "mern-blog-dec18",
  storageBucket: "mern-blog-dec18.appspot.com",
  messagingSenderId: "149005146415",
  appId: "1:149005146415:web:1771a496f2ead7d4b9a9da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);