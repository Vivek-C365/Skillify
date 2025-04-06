import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import UserLoginForm from "./services/AuthPages/login";
import SignUp from "./services/AuthPages/SignupFirebase";
import UserProfileDetail from "./pages/userProfileDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Profile" element={<UserProfileDetail />} />

      </Routes>
    </>
  );
}

export default App;
