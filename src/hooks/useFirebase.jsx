import { useContext } from "react";
import firebaseContext from "../context/AuthContext";

export const useFirebase = () => {
  return useContext(firebaseContext);
};
