import { auth, db } from "~/firebase-app/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const docRef = query(
        //   collection(db, "users"),
        //   where("email", "==", user.email)
        // );
        // onSnapshot(docRef, (snapshot) => {
        //   snapshot.forEach((doc) => {
        //     setUserInfo({
        //       ...user,
        //       ...doc.data(),
        //     });
        //   });
        // });
        const docRef = doc(db, "users", user.uid);
        const result = await getDoc(docRef);
        setUserInfo({
          ...result.data(),
          ...user,
        });
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
