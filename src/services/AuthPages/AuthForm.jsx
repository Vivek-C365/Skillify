import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../../hooks/useFirebase";
import { emailValidate, phoneValidate } from "../../utils/regexValidation";

const AuthForm = ({
  type,
  title = "Create Account",
  subtitle = "Welcome, please enter your details.",
  showSocialLogin = true,
  footerText = "Already have an account?",
  footerLinkText = "Log in",
  footerLinkPath = "/login",
  onSuccessRedirect = "/",
  analyticsImage,
}) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (firebase.userLoggedIn) {
      
      navigate(onSuccessRedirect);
    }
  }, [firebase.userLoggedIn, navigate, onSuccessRedirect]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateInputs = useCallback(() => {
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (user.email.includes("@") && !emailValidate.test(user.email)) {
      toast.error("Invalid Email");
      return false;
    }

    if (user.email.length === 10 && !phoneValidate.test(Number(user.email))) {
      toast.error("Invalid Phone Number");
      return false;
    }

    return true;
  }, [user]);

  const handleAuthWithEmail = useCallback(async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      if (type === "signup") {
        await firebase.signupWithEmailAndPassword(user.email, user.password);
      } else {
        await firebase.UserSignInwithEmailAndPassword(user.email, user.password);
      }
      setUser({ email: "", password: "" });
      navigate(onSuccessRedirect);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, validateInputs, firebase, type, navigate, onSuccessRedirect]);

  const handleAuthWithPhone = useCallback(async () => {
    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      // Implement phone auth logic here
      console.log("Phone auth with:", user.email, user.password);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [user, validateInputs]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (user.email.includes("@")) {
        await handleAuthWithEmail();
      } else if (user.email.length === 10) {
        await handleAuthWithPhone();
      }
    },
    [handleAuthWithEmail, handleAuthWithPhone, user.email]
  );

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

        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-center text-3xl font-bold">{title}</p>
          <p className="mt-2 text-center text-gray-500">{subtitle}</p>

          {showSocialLogin && (
            <>
              <button
                onClick={() => firebase.signupWithGoogle()}
                className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
              >
                <img
                  className="mr-2 h-5"
                  src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google Icon"
                />
                Continue with Google
              </button>

              <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                  or
                </div>
              </div>
            </>
          )}

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <label htmlFor="auth-email" className="sr-only">
                Email
              </label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  type="text"
                  id="auth-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email or Phone Number"
                />
              </div>
            </div>

            <div className="mb-12 flex flex-col pt-4">
              <label htmlFor="auth-password" className="sr-only">
                Password
              </label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  type="password"
                  id="auth-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : type === "signup"
                ? "Create Account"
                : "Log In"}
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              {footerText}{" "}
              <Link
                to={footerLinkPath}
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {analyticsImage && (
        <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
          <img
            loading="lazy"
            className="absolute top-0 h-full w-full object-cover opacity-90"
            src={analyticsImage}
            alt="Analytics"
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;