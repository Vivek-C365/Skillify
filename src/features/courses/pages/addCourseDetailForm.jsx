import React, { useState } from "react";
import { Form } from "antd";
import {
  FormSelect,
  FormInput,
  FormNumberInput,
  FormTextArea,
} from "../../../components/common/FormInputs";
import { FormSectionDivider } from "../../../components/common/FormSections";
import { Button } from "../../../components/common/button";
import { useFirebase } from "../../../hooks/useFirebase";

const categories = [
  "Programming basics",
  "Web design & UX/UI",
  "Graphic design",
  "Cybersecurity & data protection",
  "Data analysis & business",
  "Artificial intelligence & robotics",
  "Systems administration",
  "Digital marketing",
];

const proficiencyLevels = ["Beginner", "Intermediate", "Fluent", "Native"];

const AddCourseDetailForm = () => {
  const [form] = Form.useForm();
  const firebase = useFirebase();
  const [submitting, setSubmitting] = useState(false);
  const [courseData, setCourseData] = useState({
    imageUrl: "",
    category: "",
    name: "",
    lessons: 1,
    language: "",
    proficiency: "",
    additional_languages: 0,
    description: "",
    hourly_rate: 0,
  });

  const handleChange = (changedValues, allValues) => {
    setCourseData(allValues);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await firebase.addCourse("CouseDetails", {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      form.resetFields();
      setCourseData({
        imageUrl: "",
        category: "",
        name: "",
        lessons: 1,
        language: "",
        proficiency: "",
        additional_languages: 0,
        description: "",
        hourly_rate: 0,
      });
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">New Course</h2>
          <p className="text-gray-600">Complete all fields to list a new course</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={courseData}
          onValuesChange={handleChange}
          onFinish={handleSubmit}
        >
          {/* Image URL and Preview */}
          <div className="mb-8">
            <FormInput
              label={<span className="text-gray-700 font-medium">Course Image URL</span>}
              name="imageUrl"
              required={true}
              className="rounded-lg border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black"
              placeholder="https://example.com/image.jpg"
            />
            {courseData.imageUrl && (
              <div className="mt-4 border-2 border-dashed border-gray-100 rounded-xl overflow-hidden">
                <img
                  src={courseData.imageUrl}
                  alt="Course Preview"
                  className="w-full h-48 object-cover"
                  onError={e => (e.target.style.display = 'none')}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FormSelect
              label="Category"
              name="category"
              required={true}
              className="rounded-lg [&>div]:border-gray-300 [&>div]:hover:border-gray-400 [&>div]:focus:border-black [&>div]:focus:ring-2 [&>div]:focus:ring-black"
              options={categories}
              showSearch={true}
            />

            <FormInput
              label="Instructor Name"
              name="name"
              required={true}
              className="rounded-lg border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black"
              placeholder="John Doe"
            />

            <FormNumberInput
              label="Number of Lessons"
              name="lessons"
              required={true}
              min={1}
              className="[&>div]:rounded-lg [&>div]:border-gray-300 [&>div:hover]:border-gray-400 [&>div:focus-within]:border-black [&>div:focus-within]:ring-2 [&>div:focus-within]:ring-black"
              placeholder="10"
            />

            <FormInput
              label="Primary Language"
              name="language"
              required={true}
              className="rounded-lg border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black"
              placeholder="English"
            />

            <FormSelect
              label="Proficiency Level"
              name="proficiency"
              required={true}
              className="rounded-lg [&>div]:border-gray-300 [&>div]:hover:border-gray-400 [&>div]:focus:border-black [&>div]:focus:ring-2 [&>div]:focus:ring-black"
              options={proficiencyLevels}
            />

            <FormNumberInput
              label="Additional Languages"
              name="additional_languages"
              required={false}
              min={0}
              className="[&>div]:rounded-lg [&>div]:border-gray-300 [&>div:hover]:border-gray-400 [&>div:focus-within]:border-black [&>div:focus-within]:ring-2 [&>div:focus-within]:ring-black"
            />
          </div>

          <FormSectionDivider title="Course Description" className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2" />
          
          <FormTextArea
            label="Description"
            name="description"
            required={true}
            rows={4}
            className="rounded-lg border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black"
            showCount={true}
            maxLength={500}
            placeholder="Detailed course description..."
          />

          <FormSectionDivider title="Pricing Details" className="text-xl font-semibold text-gray-900 my-6 border-b border-gray-200 pb-2" />
          
          <FormNumberInput
            label="Hourly Rate"
            name="hourly_rate"
            required={true}
            min={0}
            step={5}
            className="[&>div]:rounded-lg [&>div]:border-gray-300 [&>div:hover]:border-gray-400 [&>div:focus-within]:border-black [&>div:focus-within]:ring-2 [&>div:focus-within]:ring-black"
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="0.00"
          />

          <div className="flex justify-end mt-10">
            <Button
              htmlType="submit"
              className="w-full md:w-auto bg-black text-white rounded-lg px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Publish Course"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCourseDetailForm;