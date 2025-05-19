import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Masterclasses from "../pages/Masterclasses";
import AdminRoute from "./PrivateRoute";
import DashboardLayout from "../components/dasboard/layout/Dashboard";
import CoursesTable from "../components/dasboard/admin/CoursesTable";
import InstructorsTable from "../components/dasboard/admin/InstructorsTable";
import StudentsTable from "../components/dasboard/admin/StudentsTable";
import MasterclassesTable from "../components/dasboard/admin/MasterclassesTable";
import { useSelector } from "react-redux";
import StudentDashboard from "../components/dasboard/student/StudentDashboard";
import TeacherDashboard from "../components/dasboard/teacher/TeacherDashboard";
import CategoriesTable from "../components/dasboard/admin/CategoriesTable";
import TeacherCoursesTable from "../components/dasboard/teacher/TeacherCoursesTable";
import TeacherList from "../components/dasboard/teacher/TeacherList";

function AppRoutes() {
  const user = useSelector((state) => state.user);
  const userDetails = user?.userDetails;
  const isAdmin = userDetails?.role === "admin";
  const isStudent = userDetails?.role === "student";
  const isTeacher = userDetails?.role === "teacher";

  return (
    <>
      <Routes>
        {!isAdmin && !isTeacher && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/masterclasses" element={<Masterclasses />} />
            <Route path="/teacherCard" element={<TeacherList/>}/>
          </>
        )}

        <Route element={<ProtectdRoute />}>
          {/* Student Routes */}
          {isStudent && (
            <>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/profile" element={<UserProfileDetail />} />
            </>
          )}

          {/* Teacher Routes */}
          {isTeacher && (
            <>
              <Route
                path="/teacher-dashboard"
                element={
                  <DashboardLayout>
                    <TeacherDashboard />
                  </DashboardLayout>
                }
              />
              <Route
                path="/my-courses"
                element={
                  <DashboardLayout>
                    <TeacherCoursesTable />
                  </DashboardLayout>
                }
              />
              <Route
                path="/addCourse"
                element={
                  <DashboardLayout>
                    <AddCourseDetailForm />
                  </DashboardLayout>
                }
              />
            </>
          )}
        </Route>

        {/* Admin Routes */}
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
            path="/Allmasterclasses"
            element={
              <DashboardLayout>
                <MasterclassesTable />
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
          <Route
            path="/categories"
            element={
              <DashboardLayout>
                <CategoriesTable />
              </DashboardLayout>
            }
          />
        </Route>

        {/* Role-based redirects */}
        {isAdmin && (
          <>
            <Route
              path="*"
              element={<Navigate to="/admin-dashboard" replace />}
            />
          </>
        )}

        {isTeacher && (
          <>
            <Route
              path="*"
              element={<Navigate to="/teacher-dashboard" replace />}
            />
          </>
        )}

        {isStudent && (
          <>
            <Route
              path="/login"
              element={<Navigate to="/student-dashboard" replace />}
            />
            <Route
              path="/signup"
              element={<Navigate to="/student-dashboard" replace />}
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}

export default AppRoutes;
