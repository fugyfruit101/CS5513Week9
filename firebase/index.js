
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// replace this firebase conFigvariable with your own
const firebaseConfig = {
apiKey: "AIzaSyDMGivILPMe-kp8dxwq3sdzMZ-MrjP3NIo",
authDomain: "cs5513-week-7.firebaseapp.com",
projectId: "cs5513-week-7",
storageBucket: "cs5513-week-7.appspot.com",
messagingSenderId: "905120201894",
appId: "1:905120201894:web:4aff2cb20525cfebcc0867"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };