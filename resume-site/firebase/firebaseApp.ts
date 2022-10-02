// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLDkA_6p4XE4VHeTzZQbX7SAZor0AifQ0",
  authDomain: "resume-bio-generator.firebaseapp.com",
  projectId: "resume-bio-generator",
  storageBucket: "resume-bio-generator.appspot.com",
  messagingSenderId: "403745769357",
  appId: "1:403745769357:web:0b87369b3e03805e0f9fc4",
  measurementId: "G-9P7NCC04Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Explore function to initialize firebase app
export const initFirebase = () => {
    return app;
};