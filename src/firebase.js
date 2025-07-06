// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4Q15mpFLWt7vwIPet3c_1YjyHSKs41Y0",
  authDomain: "glowup-tracker-28896.firebaseapp.com",
  projectId: "glowup-tracker-28896",
  storageBucket: "glowup-tracker-28896.appspot.com", // <-- fix: should be .appspot.com not .app!
  messagingSenderId: "311501583988",
  appId: "1:311501583988:web:b832d381dd3af021030321",
  measurementId: "G-V9RXXRGHR4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
