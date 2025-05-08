/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import firebaseConfig from "./firebaseConfig";
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
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import {
  addDocument,
  readOrCreateDocument,
  updateDocument,

  readDocuments,

} from "../firebase/cloudFirestore";
import { handleError, handleSuccess } from "../../utils/tostify";

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(firebaseApp);

export const FirebaseProvider = ({ children }) => {
  const [loggedIn, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user || null);
      setLoading(false);

      // if (user) {
      //   dispatch(setUserData(user.providerData[0]));
      // }

    });

    return () => unsubscribe();
  }, []);

  const userLoggedIn = loggedIn ? loggedIn : null;

  const signupWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const UserSignInwithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch or create user data from Firestore
      const userData = await readOrCreateDocument(db, "users", "data.data.email", email);
      console.log(userData);
      if (userData && userData.length > 0) {
        return {
          ...user,
          ...userData[0].data
        };
      }
      
      // If no user data exists, create it
      const newUserData = await addUserToFirestore({
        email: user.email,
        role: "student",
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL
      });
      
      return {
        ...user,
        ...newUserData
      };
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user already exists in Firestore
      const colRef = collection(db, "users");
      const q = query(colRef, where("data.data.email", "==", user.email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // User exists, return existing data
        const existingUser = querySnapshot.docs[0];
        const existingData = existingUser.data().data;
        return {
          ...user,
          ...existingData
        };
      }
      
      // User doesn't exist, create new user data
      const userData = await addUserToFirestore({
        email: user.email,
        role: "student",
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL,
        createdAt: new Date().toISOString()
      });
      
      return {
        ...user,
        ...userData
      };
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const signupWithPhone = async (phone, appVerifier) => {
    try {
      await signInWithPhoneNumber(auth, phone, appVerifier);
    } catch (error) {
      return error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleSuccess("Logged out successfully");
      return true;
    } catch (error) {
      console.error("Logout error:", error.message);
      handleError("Failed to logout");
      return false;
    }
  };

  const addUserToFirestore = async (userData) => {
    try {
      const userDoc = {
        email: userData.email,
        role: userData.role || "student",
        displayName: userData.displayName || userData.email.split("@")[0],
        photoURL: userData.photoURL || null,
        about: userData.about || "",
        skills: userData.skills || [],
        certificates: userData.certificates || [],
        github: userData.github || "",
        medium: userData.medium || "",
        twitter: userData.twitter || "",
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const colRef = collection(db, "users");
      const q = query(colRef, where("data.data.email", "==", userData.email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Update existing user data if needed
        const existingUser = querySnapshot.docs[0];
        const existingData = existingUser.data().data;
        
        // Only update if there are new fields or changes
        const updatedData = {
          ...existingData,
          ...userDoc,
          updatedAt: new Date().toISOString()
        };
        
        await updateDocument(db, "users", existingUser.id, { data: updatedData });
        return updatedData;
      }
  
      // Create new user if doesn't exist
      await addDocument(db, "users", { data: userDoc });
      return userDoc;
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const readUserFromFirestore = async (collectionname, fieldname, fieldvalue) => {
    try {
      const data = await readOrCreateDocument(db, collectionname, fieldname, fieldvalue);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const UpdateUser = async (collectionName, docid, updatedData) => {
    try {
      const data = await updateDocument(db, collectionName, docid, updatedData);
      console.log("updated Data", data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const readData = async (collectionname) => {
    try {
      const dataRead = await readDocuments(db, collectionname);
      return dataRead;
    } catch (error) {
      console.log(error.message);
    }
  };

  const addInstructor = async (data) => {
    try {
      console.log(data);
      await addDocument(db, "Instructor", data);
      handleSuccess("User added to Firestore successfully!");
    } catch (error) {
      handleError(error.message);
    }
  };

  const addMasterClass = async (data) => {
    try{
      console.log(data);

      await addDocument(db,"MasterClass",data);
      handleSuccess("MasterClass added to Firebase successfully");
    }catch(error){
      handleError(error.message);
    }
  }

  return (
    <firebaseContext.Provider
      value={{
        signupWithEmailAndPassword,
        signupWithGoogle,
        signupWithPhone,
        userLoggedIn,
        handleLogout,
        UserSignInwithEmailAndPassword,
        loading,
        addUserToFirestore,
        readUserFromFirestore,

        UpdateUser,
        addInstructor,
        addMasterClass,
        readData,

      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
