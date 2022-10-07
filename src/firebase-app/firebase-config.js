import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDvHLcyNOik-Fy4_iVi8XoNkdaApGCYsrA",
  authDomain: "zingmp3-94d9f.firebaseapp.com",
  projectId: "zingmp3-94d9f",
  storageBucket: "zingmp3-94d9f.appspot.com",
  messagingSenderId: "494511350745",
  appId: "1:494511350745:web:ae31c64079ef0ea4706fc8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
