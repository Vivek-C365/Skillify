import { useEffect } from "react";
import { useFirebase } from "./useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData, setLoading, deleteItem } from "../features/admin/admindashboadSlice";
import { handleError, handleSuccess } from "../utils/tostify";

export const useOperations = (stateKey, collectionName) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard[stateKey]);

  const fetchData = async () => {
    const firebaseData = await firebase.readData(collectionName);
    if (firebaseData) {
      dispatch(setLoading(false));
      dispatch(setDashboardData({ [stateKey]: firebaseData }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await firebase.deleteData(collectionName, id);
      dispatch(deleteItem({ key: stateKey, id }));
      handleSuccess(`${stateKey} deleted successfully`, "success");
    } catch (error) {
      console.error("Delete error:", error);
      handleError(`Failed to delete ${stateKey}: ${error.message || "Unknown error"}`);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      await firebase.updateData(collectionName, id, updatedData);
      await fetchData(); // Refresh data after edit
      handleSuccess(`${stateKey} updated successfully`, "success");
    } catch (error) {
      console.error("Edit error:", error);
      handleError(`Failed to update ${stateKey}: ${error.message || "Unknown error"}`);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(setLoading(true));
      fetchData();
      
    }
  }, []);

  return { fetchData, handleDelete, handleEdit };
}; 