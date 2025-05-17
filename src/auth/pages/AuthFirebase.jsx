import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils/tostify";
import { useFirebase } from "../../hooks/useFirebase";
import { emailValidate } from "../../utils/regexValidation";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/user/pages/userProfileSlice";
import Analytics from "../../assets/images/svg/13246824_5191077.svg";

const adminCredentials = {
  email: "admin@admin.com",
  password: "admin",
  username: "Stebin Ben",
};

const formatUserData = (userData, fallbackEmail = "") => ({
  email: userData.email,
  isAdmin: userData.role === "admin",
  role: userData.role,
  username: userData.displayName || fallbackEmail.split("@")[0],
  photoURL: userData.photoURL,
  about: userData.about || "",
  skills: userData.skills || [],
  certificates: userData.certificates || [],
  github: userData.github || "",
  medium: userData.medium || "",
  twitter: userData.twitter || "",
});

const SignUp = ({
  title,
  subtitle,
  // onSuccessPath,
  type,
  footerText,
  footerLinkPath,
  showSocialLogin = true,
  analyticsImage,
}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const userDetails = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    if (userDetails) {
      if (userDetails.role === "admin") navigate("/admin-dashboard");
      else if (userDetails.role === "teacher") navigate("/teacher-dashboard");
      else navigate("/");
    }
  }, [userDetails, navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAdminLogin = () => {
    if (
      user.email === adminCredentials.email &&
      user.password === adminCredentials.password
    ) {
      dispatch(
        setUserData({ ...adminCredentials, isAdmin: true, role: "admin" })
      );
      return true;
    }
    return false;
  };

  const handleSignup = async (email, password) => {
    const authUser = await firebase.signupWithEmailAndPassword(email, password);
    if (!authUser) {
      throw new Error("Failed to create user account");
    }

    const userData = await firebase.addUserToFirestore({
      email,
      role: "student",
      displayName: email.split("@")[0],
      createdAt: new Date().toISOString(),
      uid: authUser.uid,
    });

    handleSuccess("User successfully created");
    return userData;
  };

  const handleUserLogin = async (email, password) => {
    const userData = await firebase.UserSignInwithEmailAndPassword(
      email,
      password
    );

    if (!userData || !userData.role) {
      throw new Error("Invalid user data");
    }

    // Only allow student role to login through user tab
    if (userData.role !== "student") {
      throw new Error("Not Authorized");
    }

    return userData;
  };

  const handleTeacherLogin = async (email, password) => {
    const userData = await firebase.UserSignInwithEmailAndPassword(
      email,
      password
    );

    // Validate user role and permissions
    if (!userData || !userData.role) {
      throw new Error("Invalid user data");
    }

    // Only allow teacher role to login through teacher tab
    if (userData.role !== "teacher") {
      throw new Error("Please use the appropriate login tab for your role");
    }

    return userData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    // Input validation
    if (!email || !password) {
      return handleError("Please fill in all fields.");
    }
    if (!emailValidate.test(email)) {
      return handleError("Invalid Email");
    }

    try {
      setIsSubmitting(true);

      // Handle admin login
      if (handleAdminLogin()) {
        return;
      }

      let userData;

      if (type === "signup") {
        userData = await handleSignup(email, password);
      } else {
        // Handle regular login based on role
        if (activeTab === "user") {
          userData = await handleUserLogin(email, password);
        } else {
          userData = await handleTeacherLogin(email, password);
        }
        handleSuccess("Login successful");
      }

      // Update Redux store and reset form
      if (userData) {
        dispatch(setUserData(formatUserData(userData, email)));
        setUser({ email: "", password: "" });
      }
    } catch (error) {
      console.error(`${type === "signup" ? "Signup" : "Login"} error:`, error);
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userData = await firebase.signupWithGoogle();
      if (userData) {
        dispatch(setUserData(formatUserData(userData)));
        handleSuccess("Login successful");
        navigate("/");
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-wrap bg-white signup_texture_backdrop">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <Link
            to="/"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Skillify
          </Link>
        </div>

        <div className="mx-auto my-auto flex flex-col justify-center pt-8 md:px-6 lg:w-[28rem]">
          <p className="text-center text-3xl font-bold">{title}</p>
          <p className="mt-2 text-center text-gray-500">{subtitle}</p>

          {/*  if Types is sign up then don't show the user and teacher tab  else show  */}
          {type !== "signup" && (
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab("user")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab("teacher")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === "teacher"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Teacher
              </button>
            </div>
          )}

          {showSocialLogin && (
            <>
              <button
                onClick={handleGoogleSignIn}
                className="mt-8 flex items-center justify-center rounded-md border px-4 py-1 transition hover:bg-black hover:text-white"
              >
                <img
                  className="mr-2 h-5"
                  src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google Icon"
                />
                Continue with Google
              </button>
              <div className="relative mt-8 flex h-px bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                  or
                </div>
              </div>
            </>
          )}

          <form onSubmit={handleFormSubmit} className="flex flex-col pt-3">
            {["email", "password"].map((field) => (
              <div key={field} className="flex flex-col pt-4">
                <label htmlFor={field} className="sr-only">
                  {field}
                </label>
                <div className="relative flex overflow-hidden border-b-2 focus-within:border-b-gray-500 transition">
                  <input
                    id={field}
                    name={field}
                    type={field}
                    value={user[field]}
                    onChange={handleInputChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full flex-1 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-lg bg-gray-900 px-4 py-2 text-center font-semibold text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : type === "signup"
                ? "Create Account"
                : "Login"}
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="text-gray-600">
              {footerText}{" "}
              <Link
                to={footerLinkPath}
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                {type === "signup" ? "Log in" : "Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {analyticsImage && (
        <div className="pointer-events-none hidden h-screen md:block md:w-1/2">
          <img
            loading="lazy"
            src={Analytics}
            alt="Analytics"
            className="absolute top-0 h-full object-cover opacity-90"
          />
        </div>
      )}
    </div>
  );
};

export default SignUp;
