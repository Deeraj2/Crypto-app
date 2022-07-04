import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




const firebaseConfig = {
  apiKey: "AIzaSyDrWdAgCHZ0oS-4yXSvGVdxlLgDN5hmj5U",
  authDomain: "crypto-94ebd.firebaseapp.com",
  projectId: "crypto-94ebd",
  storageBucket: "crypto-94ebd.appspot.com",
  messagingSenderId: "1004818093723",
  appId: "1:1004818093723:web:a890d59c0240a24ca0983e",
  measurementId: "G-S72SDJ2WK2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();


export { auth };
export default db;