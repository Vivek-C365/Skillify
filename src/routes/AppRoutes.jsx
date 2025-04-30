import { Route, Routes } from "react-router-dom";
import Page404 from "../pages/Error404";
import Home from "../pages/home";
import UserProfileDetail from "../features/user/pages/userProfileDetail";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignUpPage";
import AddCourseDetailForm from "../features/courses/pages/addCourseDetailForm";
import { AdminDashboard } from "../components/dasboard/admin/AdminDasboard";
import ProtectdRoute from "./ProtectdRoute";

import Courses from "../pages/Courses";

import AdminRoute from "./PrivateRoute";
import DashboardLayout from "../components/dasboard/layout/Dashboard";
import TableRepresent from "../components/common/Table";

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
          <Route path="/courses" element={<Courses />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/addCourse" element={<AddCourseDetailForm />} />

          {/* <Route path="/addTeacher" element={<AddTeachers />} /> */}

          <Route
            path="/admin-dashboard"
            element={
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/Allcourses"
            element={
              <DashboardLayout>
                <TableRepresent />
              </DashboardLayout>
            }
          />
          <Route
            path="/instructors"
            element={
              <DashboardLayout>
                <TableRepresent />
              </DashboardLayout>
            }
          />
          <Route
            path="/students"
            element={
              <DashboardLayout>
                <TableRepresent />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
