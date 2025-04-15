import { useState, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
// eslint-disable-next-line no-unused-vars
import firebaseContext from "../../context/AuthContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { addDocument } from "../firebase/cloudFirestore";
import { handleError, handleSuccess } from "../../utils/tostify";

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [loggedIn, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user || null);
      setLoading(false); // Set loading to false once auth check is done
    });

    return () => unsubscribe(); // Cleanup
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

  const UserSignInwithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleSuccess("User Sign In Successfully!");
    } catch (error) {
      handleError(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      console.log("Google signup initiated");
      await signInWithPopup(auth, googleProvider);

      handleSuccess("User created successfully!");
    } catch (error) {
      return error;
    }
  };

  const signupWithPhone = async (phone, appVerifier) => {
    try {
      await signInWithPhoneNumber(auth, phone, appVerifier);
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

  const addDocumentToFirestore = async (collectionName, data) => {
    try {
      await addDocument(db, collectionName, data);
      handleSuccess("Added document successfully!");
    } catch (error) {
      handleError(error.message);
      console.error("Error adding document:", error.message);
      handleError("Error adding document:", error.message);
      return false;
    }
  };
  return (
    <firebaseContext.Provider
      // value={{ signupWithEmailAndPassword, , signupWithGoogle, userLoggedIn  , handleLogout}}
      value={{
        signupWithEmailAndPassword,
        signupWithGoogle,
        signupWithPhone,
        userLoggedIn,
        handleLogout,
        UserSignInwithEmailAndPassword,
        addDocumentToFirestore,
        loading,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};



