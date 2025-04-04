import firebaseConfig from "./firebaseConfig";
// eslint-disable-next-line no-unused-vars
import firebaseContext from "../context/firebaseContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { handleError, handleSuccess } from "../../utils/tostify";

import { useState, useEffect } from "react";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [loggedIn, setLoggedInUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  const userLoggedIn = loggedIn ? loggedIn : null;

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
      return error;
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
  return (
    <firebaseContext.Provider
      value={{ signupWithEmailAndPassword, signupWithGoogle, userLoggedIn  , handleLogout}}
    >
      {children}
    </firebaseContext.Provider>
  );
};
