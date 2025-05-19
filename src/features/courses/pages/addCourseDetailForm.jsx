import React, { useState, useEffect } from "react";
import { Form, Row, Col, message } from "antd";
import { Button } from "../../../components/common/button";
import { useFirebase } from "../../../hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, setLoading, setError } from "../courseSlice";
import {
  FormInput,
  FormSelect,
  FormNumberInput,
  FormTextArea,
} from "../../../components/common/FormInputs";

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Fluent", "Native"];

const AddCourseDetailForm = () => {
  const [form] = Form.useForm();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = useSelector((state) => state.user?.userDetails);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await firebase.readData("Categories");
        if (categoriesData) {
          setCategories(
            categoriesData.map((category) => ({
              value: category.data.name,
              label: category.data.name,
              id: category.id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        message.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [firebase]);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      dispatch(setLoading(true));
      const courseId = `course_${Date.now()}`;

      const courseData = {
        id: courseId,
        instructorId: currentUser.uid,
        instructorData: {
          name: currentUser.username || "",
          email: currentUser.email || "",
          photoURL: currentUser.photoURL || "",
          expertise: "",
        },
        name: values.name || "",
        category: values.category || "",
        imageUrl: values.imageUrl || "",
        language: values.language || "",
        proficiency: values.proficiency || "",
        description: values.description || "",
        hourly_rate: values.hourly_rate || 0,
        lessons: values.lessons || 0,
        additional_languages: values.additional_languages || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        enrolledStudents: [],
        rating: 0,
        reviews: [],
        status: "draft",
      };

      // Add course to courses collection
      await firebase.addCourse("CouseDetails", courseData);

      // // Update instructor's document with the new course ID
      // const courses = currentUser.data.courses || [];
      // await firebase.updateData("Instructor", currentUser.id, {
      //   "data.courses": [...courses, courseId],
      // });

      dispatch(addCourse(courseData));
      message.success("Course added successfully!");
      form.resetFields();
      setImageUrl("");
    } catch (error) {
      console.error("Error adding course:", error);
      dispatch(setError(error.message));
      message.error(error.message || "Failed to add course");
    } finally {
      setSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-6 max-w-4xl mx-auto py-8"
      onValuesChange={(_, allValues) => setImageUrl(allValues.imageUrl || "")}
    >
      {/* Course Details Card */}
      <div className="w-full p-6 bg-white rounded-[16px] shadow border border-gray-200">
        <p className="font-[Poppins] font-bold text-[#18181B] text-[18px] md:text-[22px] leading-[100%] mb-4">
          Course Details
        </p>
        <div className="border-b border-solid border-gray-200 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <FormInput
              name="name"
              label="Course Title"
              required
              placeholder="Enter course title"
            />
          </Col>
          <Col xs={24} md={12}>
            <FormSelect
              name="category"
              label="Category"
              required
              options={categories}
              placeholder="Select category"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <FormNumberInput
              name="lessons"
              label="Number of Lessons"
              required
              placeholder="10"
              min={1}
            />
          </Col>
          <Col xs={24} md={8}>
            <FormInput
              name="language"
              label="Primary Language"
              required
              placeholder="English"
            />
          </Col>
          <Col xs={24} md={8}>
            <FormSelect
              name="proficiency"
              label="Proficiency Level"
              required
              options={PROFICIENCY_LEVELS.map((level) => ({
                value: level,
                label: level,
              }))}
              placeholder="Select level"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <FormNumberInput
              name="additional_languages"
              label="Additional Languages"
              placeholder="0"
              min={0}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              name="imageUrl"
              label="Course Image URL"
              required
              placeholder="https://example.com/image.jpg"
            />
          </Col>
        </Row>
        {imageUrl && (
          <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-4 flex flex-col items-center justify-center bg-gray-50 mb-4">
            <img
              src={imageUrl}
              alt="Course Preview"
              className="w-full max-w-xs h-40 object-cover rounded-md mb-2"
              onError={(e) => (e.target.style.display = "none")}
            />
            <span className="text-xs text-gray-500">Preview</span>
          </div>
        )}
        <FormTextArea
          name="description"
          label="Course Description"
          required
          rows={5}
          maxLength={500}
          placeholder="Write here"
        />
      </div>
      {/* Pricing Card */}
      <div className="w-full p-6 bg-white rounded-[16px] shadow border border-gray-200">
        <p className="font-[Poppins] font-bold text-[#18181B] text-[18px] md:text-[22px] leading-[100%] mb-4">
          Pricing
        </p>
        <div className="border-b border-solid border-gray-200 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <FormNumberInput
              name="hourly_rate"
              label="Hourly Rate"
              required
              placeholder="0.00"
              min={0}
            />
          </Col>
        </Row>
      </div>
      {/* Save Button */}
      <div className="flex justify-end py-6">
        <Button
          htmlType="submit"
          className="h-[48px] w-full md:w-[166px] bg-blue-600 border border-blue-600 rounded-full text-white text-[16px] font-semibold cursor-pointer hover:opacity-90 active:opacity-80 shadow-md"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </Form>
  );
};

export default AddCourseDetailForm;
