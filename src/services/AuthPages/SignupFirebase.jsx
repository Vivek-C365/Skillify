import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../utils/tostify";
import { useFirebase } from "../firebase";
import { emailValidate, phoneValidate } from "../../utils/regexValidation";

const SignUp = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState({ email: "", password: "" });

  // Debounce logic for submit button
  let debounceTimeout = useMemo(() => null, []);
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
    },
    [setUser]
  );

  const withEmail = async (email, password) => {
    if (!emailValidate.test(email)) {
      handleError("Invalid Email");
      return;
    }
    try {
      await firebase.signupWithEmailAndPassword(email, password);
      setUser({ email: "", password: "" });
    } catch (error) {
      handleError(error.message);
    }
  };

  const withPhone = async (phone, password) => {
    const phonenumer = Number(phone);
    if (!phoneValidate.test(phonenumer)) {
      handleError("Invalid Phone Number");
      return;
    }
    try {
      console.log("working" + phonenumer + password);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (debounceTimeout) return; // Block submissions within the debounce period

    debounceTimeout = setTimeout(() => {
      debounceTimeout = null;
    }, 2600);

    const { email, password } = user;

    if (!email || !password) {
      handleError("Please fill in all fields.");
      return;
    }
    try {
      if (email.includes("@")) {
        withEmail(email, password);
      }
      if (user.email.length == 10) {
        withPhone(email, password);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-wrap bg-white signup_texture_backdrop">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12  md:justify-start md:pl-12">
          <Link
            to="/"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Skillify
          </Link>
        </div>

        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-center text-3xl font-bold">Create Account</p>
          <p className="mt-2 text-center text-gray-500">
            Welcome, please enter your details.
          </p>

          <button
            // onClick={googleSignedRequest}
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

          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col pt-4">
              <label htmlFor="SignUp-email" className="sr-only">
                Email
              </label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  type="text"
                  id="SignUp-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email or Phone Number"
                />
              </div>
            </div>

            <div className="mb-12 flex flex-col pt-4">
              <label htmlFor="SignUp-password" className="sr-only">
                Password
              </label>
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  type="password"
                  id="SignUp-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              id="SignUp-button"
              type="submit"
              //   disabled={isSubmitting}
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 disabled:opacity-50"
            >
              {/* {isSubmitting ? "Submitting..." : "Create Account"} */}
              Create Account
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              {`Already have an account? `}
              <Link
                to="/Login"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img
          loading="lazy"
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          //   src={Analytics}
          alt="Analytics"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
