import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleError, handleSuccess } from "../../../utils/tostify";

export const AddInstructorForm = () => {
  const firebase = useFirebase();
  const [isChecking, setIsChecking] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    expertise: "",
    role: "teacher"
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      // .min(8, "Password must be at least 8 characters")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      // .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    expertise: Yup.string().required("Expertise is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setIsChecking(true);
      
      // Create authentication account for the instructor
      const userCredential = await firebase.signupWithEmailAndPassword(values.email, values.password);
      
      // Add instructor data to Firestore
      await firebase.addInstructor({
        ...values,
        uid: userCredential.uid,
        createdAt: new Date().toISOString()
      });

      handleSuccess("Instructor added successfully!");
      resetForm();
      setSubmitting(false);
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
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physics">Physics</option>
              </Field>
              <ErrorMessage
                name="expertise"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting || isChecking}
              >
                {isSubmitting || isChecking ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
