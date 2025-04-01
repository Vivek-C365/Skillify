import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import UserLoginForm from "./services/AuthPages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLoginForm />} />
      </Routes>
    </>
  );
}

export default App;
