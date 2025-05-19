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

// Function helpers
const getUserByEmail = async (collectionName, email) => {
  const colRef = collection(db, collectionName);
  const q = query(colRef, where("data.email", "==", email));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  return querySnapshot.empty ? null : querySnapshot.docs[0];
};

const updateUserStatus = async (collectionName, docId, status) => {
  const statusData = {
    "data.status": status,
    [`data.last${status === "active" ? "Login" : "Logout"}`]:
      new Date().toISOString(),
  };
  await updateDocument(db, collectionName, docId, statusData);
};

const formatUserData = (user, additionalData = {}) => ({
  ...user,
  ...additionalData,
  role: additionalData.role || "student",
  status: "active",
});

export const FirebaseProvider = ({ children }) => {
  const [loggedIn, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user || null);
      setLoading(false);
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

      // Check instructor first
      const instructorDoc = await getUserByEmail("Instructor", email);
      if (instructorDoc) {
        await updateUserStatus("Instructor", instructorDoc.id, "active");
        return formatUserData(user, {
          ...instructorDoc.data(),
          role: "teacher",
        });
      }

      // Check regular user
      const userDoc = await getUserByEmail("users", email);
      if (userDoc) {
        await updateUserStatus("users", userDoc.id, "active");
        return formatUserData(user, {
          ...userDoc.data(),
          role: userDoc.data().role || "student",
        });
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

      const existingUser = await getUserByEmail("users", user.email);
      if (existingUser) {
        return formatUserData(user, existingUser.data());
      }

      const userData = await addUserToFirestore({
        email: user.email,
        role: "student",
        displayName: user.displayName || user.email.split("@")[0],
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });

      return formatUserData(user, userData);
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
        const userDoc = await getUserByEmail("users", currentUser.email);
        if (userDoc) {
          await updateUserStatus("users", userDoc.id, "inactive");
        }

        const instructorDoc = await getUserByEmail(
          "Instructor",
          currentUser.email
        );
        if (instructorDoc) {
          await updateUserStatus("Instructor", instructorDoc.id, "inactive");
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
        status: "inactive",
        lastLogin: null,
        lastLogout: null,
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingUser = await getUserByEmail("users", userData.email);
      if (existingUser) {
        const updatedData = {
          ...existingUser.data(),
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
      return await readOrCreateDocument(
        db,
        collectionname,
        fieldname,
        fieldvalue
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const UpdateUser = async (collectionName, docid, updatedData) => {
    try {
      await updateDocument(db, collectionName, docid, updatedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const readData = async (collectionname) => {
    try {
      return await readDocuments(db, collectionname);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkInstructorExists = async (email) => {
    try {
      const instructorDoc = await getUserByEmail("Instructor", email);
      return !!instructorDoc;
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
    try {
      const existingCategory = await getUserByEmail("Categories", data.slug);
      if (existingCategory) {
        throw new Error("Category already exists");
      }
      await addDocument(db, "Categories", {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleError(error.message);
      throw error;
    }
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
        getUserByEmail,
        updateUserStatus,
        formatUserData,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
