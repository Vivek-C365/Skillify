import React from "react";
import { Form, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  FormSelect,
  FormInput,
  FormNumberInput,
  FormTextArea,
} from "../components/common/FormInputs";
import { FormSectionDivider } from "../components/common/FormSections";
import { Button } from "../components/common/button";
import { useFirebase } from "../hooks/useFirebase";
const CourseForm = () => {
  const [form] = Form.useForm();
  const Firebase = useFirebase();
  const onFinish = async (values) => {
    console.log("Form Data:", values);
    try {
      await Firebase.addDocumentToFirestore(
        "CouseDetails",
        values,
        "Added Course Successfully"
      );
    } catch (error) {
      console.error("Error adding document:", error.message);
      return false;
    }
    form.resetFields();
  };

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

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
      <Card
        title="Add New Course"
        variant="outlined"
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={12}>
              <FormSelect
                label="Category"
                name="category"
                required={true}
                options={categories}
                showSearch={true}
              />
            </Col>
            <Col span={12}>
              <FormInput
                label="Instructor Name"
                name="name"
                required={true}
                placeholder="Enter instructor full name"
              />
            </Col>
          </Row>

          <FormSectionDivider title="Course Details" />

          <Row gutter={24}>
            <Col span={8}>
              <FormNumberInput
                label="Number of Lessons"
                name="lessons"
                required={true}
                min={1}
                placeholder="10"
              />
            </Col>
            <Col span={8}>
              <FormInput
                label="Language"
                name="language"
                required={true}
                placeholder="e.g. English"
              />
            </Col>
            <Col span={8}>
              <FormSelect
                label="Proficiency"
                name="proficiency"
                required={true}
                options={proficiencyLevels}
              />
            </Col>
          </Row>

          <FormNumberInput
            label="Additional Languages"
            name="additional_languages"
            required={false}
            min={0}
            tooltip="Number of other languages the instructor can teach in"
          />

          <FormTextArea
            label="Course Description"
            name="description"
            required={true}
            rows={5}
            showCount={true}
            maxLength={500}
            placeholder="Provide a detailed description of the course..."
            rules={[{ min: 50, message: "Minimum 50 characters required" }]}
          />

          <FormSectionDivider title="Pricing" />

          <FormNumberInput
            label="Hourly Rate ($)"
            name="hourly_rate"
            required={true}
            min={0}
            step={5}
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            placeholder="0.00"
          />

          <Form.Item style={{ marginTop: "2rem" }}>
            <Button
              children={"Submit"}
              className={"!text-[12px] hover:bg-gray-800 "}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CourseForm;
