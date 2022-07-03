import { initializeApp } from "firebase/compat/app";
import { getAuth } from "firebase/compat/auth";
import { getFirestore } from "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig";



const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)


export { auth };
export default db;