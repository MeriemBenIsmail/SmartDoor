import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyAxa-TFIc4Rb8wS6YM4NFdNv3Z2q2iIyoM",
  authDomain: "smart-door-430d3.firebaseapp.com",
  projectId: "smart-door-430d3",
  storageBucket: "smart-door-430d3.appspot.com",
  messagingSenderId: "830861055097",
  appId: "1:830861055097:web:0200670a7a72232dc8f0a8",
  measurementId: "G-T5WJGC6HNZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);