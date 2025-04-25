import { Route, Routes } from "react-router-dom";
import Page404 from "../pages/Error404";
import Home from "../pages/home";
import UserProfileDetail from "../features/user/pages/userProfileDetail";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignUpPage";
import AddCourseDetailForm from "../features/courses/pages/addCourseDetailForm";
import AddTeachers from "../features/teachers/pages/AddTeachers";
import ProtectdRoute from "./ProtectdRoute";
import AdminRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectdRoute />}>
          <Route path="/Profile" element={<UserProfileDetail />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/addCourse" element={<AddCourseDetailForm />} />
          <Route path="/addTeacher" element={<AddTeachers />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
