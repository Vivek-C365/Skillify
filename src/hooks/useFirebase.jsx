import firebaseContext from "../services/context/firebaseContext";
import { useContext } from "react";

export const useFirebase = () => useContext(firebaseContext);
