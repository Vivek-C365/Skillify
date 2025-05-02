import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";

function AdminRoute() {
  const user = useSelector((state) => state.user);
  const userDetails = user?.userDetails;
  const location = useLocation();


  const isAdmin = userDetails?.role === "admin";

  if (!userDetails) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
   
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default AdminRoute;
