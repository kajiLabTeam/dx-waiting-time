import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQCD40J2m4b3i0WT9AvmzmZPpVKWaepXc",
  authDomain: "web-push-notification-practise.firebaseapp.com",
  projectId: "web-push-notification-practise",
  storageBucket: "web-push-notification-practise.appspot.com",
  messagingSenderId: "844132776020",
  appId: "1:844132776020:web:d9cbdeaef0ebb6b72555c1",
  measurementId: "G-B3513M6L7T",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
