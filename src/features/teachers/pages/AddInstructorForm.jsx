import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleError } from "../../../utils/tostify";
import { useSelector } from "react-redux";

export const AddInstructorForm = ({ onSuccess, onClose }) => {
  const firebase = useFirebase();
  const [isChecking, setIsChecking] = useState(false);
  const { categories } = useSelector((state) => state.dashboard);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    expertise: "",
    role: "teacher",
    photoURL: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    expertise: Yup.string().required("Expertise is required"),
    photoURL: Yup.string().url("Must be a valid URL").nullable(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsChecking(true);
      const userCredential = await firebase.signupWithEmailAndPassword(values.email, values.password);
      await firebase.addInstructor({
        ...values,
        uid: userCredential.uid,
        createdAt: new Date().toISOString(),
        // photoURL: values.photoURL, // You can handle upload and store URL here
      });
      resetForm();
      setSubmitting(false);
      onSuccess?.();
    } catch (error) {
      handleError(error.message);
      setSubmitting(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="mx-auto transition-all">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Add Instructor
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Field
                name="phone"
                type="tel"
                placeholder="1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Expertise Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expertise
              </label>
              <Field
                name="expertise"
                as="select"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select expertise</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.data.name}>
                    {category.data.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="expertise"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Profile Picture URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <Field
                name="photoURL"
                type="url"
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <ErrorMessage
                name="photoURL"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                disabled={isSubmitting || isChecking}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting || isChecking}
              >
                {isSubmitting || isChecking ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    {isChecking ? "Checking..." : "Adding..."}
                  </div>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
