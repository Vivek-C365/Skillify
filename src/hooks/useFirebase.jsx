import firebaseContext from "../context/AuthContext";
import { useContext } from "react";

export const useFirebase = () => useContext(firebaseContext);
