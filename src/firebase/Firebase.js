import firebase from "firebase/app";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU9oyHcaRl6XqeeQEGlOuzfkL4bRwKD_0",
  authDomain: "sisteminformasiapotek.firebaseapp.com",
  databaseURL: "https://sisteminformasiapotek.firebaseio.com",
  projectId: "sisteminformasiapotek",
  storageBucket: "sisteminformasiapotek.appspot.com",
  messagingSenderId: "820754380467",
  appId: "1:820754380467:web:740323d97714447d4722c6",
  measurementId: "G-2GZ78FTGJ3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
