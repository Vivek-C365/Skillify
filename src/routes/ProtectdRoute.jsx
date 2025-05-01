import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import Loading from "../components/common/Loading";
import { useSelector } from "react-redux";

function ProtectdRoute() {
  const { userLoggedIn, loading } = useFirebase();
  const user = useSelector((state) => state.user);
  const userDetails = user?.userDetails;
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }


  if (!userLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (userDetails?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectdRoute;
