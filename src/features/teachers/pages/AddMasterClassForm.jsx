import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { useFirebase } from '../../../hooks/useFirebase';

export const AddMasterClassForm = ({ onClose }) => {
  const firebase = useFirebase()
  const initialValues = {
    name: "",
    personExperience: "",
    category: "",
    url: "",
    masterclassTitle: "",
    description: "",
    date: "", // Added date field
    time: "",
    day: "",
    duration: ""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    masterclassTitle: Yup.string().required("MasterClass Title is required"),
    personExperience: Yup.string().required("Person's experience is required"),
    category: Yup.string().required("Category is required"),
    url: Yup.string().required("Image URL is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"), // Date validation
    time: Yup.string().required("Time is required"),
    day: Yup.string().required("Day is required"),
    duration: Yup.string().required("Duration is required")
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    await firebase.addMasterClass(values);
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Add New MasterClass</h2>
        <p className="text-sm text-gray-500 mt-2">Fill in the details carefully</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.name && touched.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Full Name"
              />
              <ErrorMessage name="name" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* MasterClass Title Field */}
            <div>
              <label htmlFor="masterclassTitle" className="block text-sm font-medium text-gray-700 mb-1">
                MasterClass Title
              </label>
              <Field
                type="text"
                id="masterclassTitle"
                name="masterclassTitle"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.masterclassTitle && touched.masterclassTitle ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="MasterClass Title"
              />
              <ErrorMessage name="masterclassTitle" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Person Experience Field */}
            <div>
              <label htmlFor="personExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Your Experience
              </label>
              <Field
                type="text"
                id="personExperience"
                name="personExperience"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.personExperience && touched.personExperience ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Your experience in years"
              />
              <ErrorMessage name="personExperience" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Field
                id="category"
                name="category"
                as="select"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.category && touched.category ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select a Category</option>
                <option value="Data Science">Programming Basics</option>
                <option value="Computer Science"></option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud">Cloud</option>
                <option value="DevOps">DevOps</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Business">Business Related</option>
                <option value="Guidance">Guidance/Roadmap</option>
              </Field>
              <ErrorMessage name="category" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Field
                type="url"
                id="url"
                name="url"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.url && touched.url ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage name="url" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Description Field - Textarea with visible overflow */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.description && touched.description ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Detailed description of the masterclass..."
                style={{ resize: "vertical", minHeight: "100px" }}
              />
              <ErrorMessage name="description" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Date Field */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.date && touched.date ? "border-red-400" : "border-gray-300"
                }`}
              />
              <ErrorMessage name="date" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Time Field */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <Field
                type="time"
                id="time"
                name="time"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.time && touched.time ? "border-red-400" : "border-gray-300"
                }`}
              />
              <ErrorMessage name="time" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Day Field */}
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
                Day of Week
              </label>
              <Field
                as="select"
                id="day"
                name="day"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.day && touched.day ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Field>
              <ErrorMessage name="day" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Duration Field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <Field
                type="number"
                id="duration"
                name="duration"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.duration && touched.duration ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="e.g., 90"
              />
              <ErrorMessage name="duration" component="div" className="mt-1 text-xs text-red-500" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                    Adding...
                  </div>
                ) : (
                  "Add MasterClass"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMasterClassForm;