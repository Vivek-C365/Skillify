import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleError, handleSuccess } from "../../../utils/tostify";
export const AddCategoryForm = ({ onClose, onSuccess }) => {
  const firebase = useFirebase();
  const initialValues = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Description is required"),
    imageUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const slug = values.name.toLowerCase().replace(/\s+/g, "-");

      await firebase.addCategory({
        ...values,
        slug,
        createdAt: new Date().toISOString(),
      });

      handleSuccess("Category added successfully!", "success");
      resetForm();
      setSubmitting(false);
      onSuccess?.();
    } catch (error) {
      handleError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Add New Category</h2>
        <p className="text-sm text-gray-500 mt-2">
          Fill in the category details
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5">
            {/* Category Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.name && touched.name
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                placeholder="e.g., Web Development"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.description && touched.description
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                placeholder="Describe this category..."
                style={{ resize: "vertical", minHeight: "100px" }}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-xs text-red-500"
              />
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <Field
                type="url"
                id="imageUrl"
                name="imageUrl"
                className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                  errors.imageUrl && touched.imageUrl
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                placeholder="https://example.com/category-image.jpg"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="mt-1 text-xs text-red-500"
              />
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
                className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
