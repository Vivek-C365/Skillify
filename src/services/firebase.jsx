import firebaseContext from "../services/context/firebaseContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { handleError, handleSuccess } from "../utils/tostify";
const firebaseConfig = {
  apiKey: "AIzaSyDOESxLS-I5QzqnMyc_I2bhSS6PHl383sI",
  authDomain: "skillify-a2035.firebaseapp.com",
  projectId: "skillify-a2035",
  storageBucket: "skillify-a2035.firebasestorage.app",
  messagingSenderId: "514292899346",
  appId: "1:514292899346:web:bf0f12baed0d3cde9a82cb",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      handleSuccess("User created successfully!");
    } catch (error) {
      handleError(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      console.log("Google signup initiated");
      const testing = await signInWithPopup(auth, googleProvider);
      console.log(testing);
      handleSuccess("User created successfully!");
    } catch (error) {
      return;
    }
  };

  return (
    <firebaseContext.Provider
      value={{ signupWithEmailAndPassword, signupWithGoogle }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
