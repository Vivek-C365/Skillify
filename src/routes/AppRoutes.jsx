import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "../pages/Error404";
import Home from "../pages/home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import UserProfileDetail from "../features/user/pages/userProfileDetail";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignUpPage";
import AddCourseDetailForm from "../features/courses/pages/addCourseDetailForm";
import { AdminDashboard } from "../components/dasboard/admin/AdminDasboard";
import ProtectdRoute from "./ProtectdRoute";
import Courses from "../pages/Courses";
import AdminRoute from "./PrivateRoute";
import DashboardLayout from "../components/dasboard/layout/Dashboard";
import CoursesTable from "../components/dasboard/admin/CoursesTable";
import InstructorsTable from "../components/dasboard/admin/InstructorsTable";
import StudentsTable from "../components/dasboard/admin/StudentsTable";
import { useSelector } from "react-redux";
import StudentDashboard from "../components/dasboard/student/StudentDashboard";
import TeacherDashboard from "../components/dasboard/teacher/TeacherDashboard";

function AppRoutes() {
  const user = useSelector((state) => state.user);
  const userDetails = user?.userDetails;
  const isAdmin = userDetails?.role === "admin";
  const student = userDetails?.role === "student";

  return (
    <Routes>
      {!isAdmin && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </>
      )}
      {/* <Route path="/courses" element={<Courses />} /> */}

      <Route element={<ProtectdRoute />}>
        <Route path="/profile" element={<UserProfileDetail />} />
        {student && (
          <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </>
        )}

        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route
          path="/admin-dashboard"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        <Route path="/addCourse" element={<AddCourseDetailForm />} />
        <Route
          path="/Allcourses"
          element={
            <DashboardLayout>
              <CoursesTable />
            </DashboardLayout>
          }
        />
        <Route
          path="/instructors"
          element={
            <DashboardLayout>
              <InstructorsTable />
            </DashboardLayout>
          }
        />
        <Route
          path="/students"
          element={
            <DashboardLayout>
              <StudentsTable />
            </DashboardLayout>
          }
        />
      </Route>

      {isAdmin && (
        <>
          <Route
            path="/"
            element={<Navigate to="/admin-dashboard" replace />}
          />
          <Route
            path="/login"
            element={<Navigate to="/admin-dashboard" replace />}
          />
          <Route
            path="/signup"
            element={<Navigate to="/admin-dashboard" replace />}
          />
        </>
      )}

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;
