// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import Loading from "../components/common/Loading";

const adminEmail = "admin@admin.com";

function AdminRoute() {
  const { userLoggedIn, userDetails, loading } = useFirebase();
  console.log(userDetails, "userDetails");

  if (loading) return <Loading />;

  if (!userLoggedIn) return <Navigate to="/login" />;

  return userDetails?.email === adminEmail ? (
    <Outlet />
  ) : (
    <Navigate to="/not-authorized" />
  );
}

export default AdminRoute;
