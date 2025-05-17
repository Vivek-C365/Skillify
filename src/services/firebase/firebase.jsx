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
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  addDocument,
  readOrCreateDocument,
  updateDocument,
  readDocuments,
  deleteDocument,
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const UserSignInwithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      // First check if user is an instructor
      const instructorRef = collection(db, "Instructor");
      const instructorQuery = query(
        instructorRef,
        where("data.email", "==", email)
      );
      const instructorSnapshot = await getDocs(instructorQuery);

      if (!instructorSnapshot.empty) {
        // If user is an instructor, return instructor data
        const instructorData = instructorSnapshot.docs[0].data();
        // Update instructor status to active
        await updateDocument(db, "Instructor", instructorSnapshot.docs[0].id, {
          "data.status": "active",
          "data.lastLogin": new Date().toISOString(),
        });
        return {
          ...user,
          ...instructorData,
          role: "teacher",
          status: "active",
        };
      }

      // If not an instructor, check  in users collection
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("data.email", "==", email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        await updateDocument(db, "users", userSnapshot.docs[0].id, {
          "data.status": "active",
          "data.lastLogin": new Date().toISOString(),
        });
        return {
          ...user,
          ...userData,
          role: userData.role || "student",
          status: "active",
        };
      }

      throw new Error("No account found with this email");
    } catch (error) {
      console.error("Login error:", error);
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
      const q = query(colRef, where("data.email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User exists, return existing data
        const existingUser = querySnapshot.docs[0];
        const existingData = existingUser.data().data;
        return {
          ...user,
          ...existingData,
        };
      }

      // User doesn't exist, create new user data
      const userData = await addUserToFirestore({
        email: user.email,
        role: "student",
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });

      return {
        ...user,
        ...userData,
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
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = collection(db, "users");
        const userQuery = query(
          userRef,
          where("data.email", "==", currentUser.email)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          await updateDocument(db, "users", userSnapshot.docs[0].id, {
            "data.status": "inactive",
            "data.lastLogout": new Date().toISOString(),
          });
        }

        const instructorRef = collection(db, "Instructor");
        const instructorQuery = query(
          instructorRef,
          where("data.email", "==", currentUser.email)
        );
        const instructorSnapshot = await getDocs(instructorQuery);

        if (!instructorSnapshot.empty) {
          await updateDocument(
            db,
            "Instructor",
            instructorSnapshot.docs[0].id,
            {
              "data.status": "inactive",
              "data.lastLogout": new Date().toISOString(),
            }
          );
        }
      }

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
        status: "inactive", // Add initial status
        lastLogin: null,
        lastLogout: null,
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const colRef = collection(db, "users");
      const q = query(colRef, where("data.email", "==", userData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingUser = querySnapshot.docs[0];
        const existingData = existingUser.data().data;

        const updatedData = {
          ...existingData,
          ...userDoc,
          updatedAt: new Date().toISOString(),
        };

        await updateDocument(db, "users", existingUser.id, {
          data: updatedData,
        });
        return updatedData;
      }

      await addDocument(db, "users", userDoc);
      return userDoc;
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const readUserFromFirestore = async (
    collectionname,
    fieldname,
    fieldvalue
  ) => {
    try {
      const data = await readOrCreateDocument(
        db,
        collectionname,
        fieldname,
        fieldvalue
      );
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

  const checkInstructorExists = async (email) => {
    try {
      const colRef = collection(db, "Instructor");
      const q = query(colRef, where("data.email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking instructor:", error);
      throw error;
    }
  };

  const addInstructor = async (data) => {
    try {
      const exists = await checkInstructorExists(data.email);
      if (exists) {
        throw new Error("Instructor already exists");
      }

      const instructorData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDocument(db, "Instructor", instructorData);
      handleSuccess("Instructor Added");
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const addMasterClass = async (data) => {
    try {
      console.log(data);

      await addDocument(db, "MasterClass", data);
      handleSuccess("MasterClass Added");
    } catch (error) {
      handleError(error.message);
    }
  };

  const addCourse = async (collectionName, data) => {
    try {
      await addDocument(db, collectionName, data);
      handleSuccess("Course Added");
    } catch (error) {
      handleError(error.message);
    }
  };

  const addCategory = async (data) => {
    const colRef = collection(db, "Categories");
    const q = query(colRef, where("data.slug", "==", data.slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Category already exists");
    }
    await addDocument(db, "Categories", {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteData = async (collectionName, docId) => {
    try {
      await deleteDocument(db, collectionName, docId);
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const updateData = async (collectionName, docId, updatedData) => {
    try {
      await updateDocument(db, collectionName, docId, updatedData);
    } catch (error) {
      handleError(error.message);
    }
  };



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
        addCategory,
        readData,
        deleteData,
        updateData,
        addCourse,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
