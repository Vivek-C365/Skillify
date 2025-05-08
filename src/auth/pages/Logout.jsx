import { useFirebase } from "../../hooks/useFirebase";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../features/user/pages/userProfileSlice";
import { handleSuccess } from "../../utils/tostify";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const success = await firebase.handleLogout();
      if (success) {
        dispatch(clearUserData());
        handleSuccess("Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return handleLogout;
}; 