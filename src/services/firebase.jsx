import firebaseConfig from "./firebaseConfig";
import firebaseContext from "../services/context/firebaseContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { handleError, handleSuccess } from "../utils/tostify";

const firebaseContextprovider = new firebaseContext();
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

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
      return error;
    }
  };

  return (
    <firebaseContextprovider.Provider
      value={{ signupWithEmailAndPassword, signupWithGoogle }}
    >
      {children}
    </firebaseContextprovider.Provider>
  );
};
