import { Route, Routes } from "react-router-dom";
import Page404 from "./pages/Error404";
import Home from "./pages/home";
// import UserLoginForm from "./services/AuthPages/login";
// import SignUp from "./services/AuthPages/SignupFirebase";
import UserProfileDetail from "./pages/userProfileDetail";
import LoginPage from "./services/AuthPages/LoginPage";
import SignupPage from "./services/AuthPages/SignUpPage";
import CourseForm from "./pages/addCourseDetailForm";

function App() {
  return (
    <>
    
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<UserLoginForm />} /> */}
        {/* <Route path="/Signup" element={<SignUp />} /> */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/Profile" element={<UserProfileDetail />} />
        <Route path="/addCourse" element={<CourseForm />} />
      </Routes>
    </>
  );
}

export default App;
