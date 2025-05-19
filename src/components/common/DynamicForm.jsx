import React, { useState } from "react";
import { Button, Upload, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FormInput, FormSelect, FormNumberInput, FormTextArea } from './FormInputs'; // Adjust the path as necessary

const DynamicForm = ({
  fields,
  initialValues,
  onSave,
  onDelete,
  onCancel,
  title,
  submittingSave = false,
  submittingDelete = false,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialValues);

  const handleValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleImageUpload = ({ file }) => {
    if (file.status === "done") {
      message.success(`${file.name} uploaded successfully`);
      setFormData({ ...formData, image: file.response.url });
    } else if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }
  };

  return (
    <div className="p-6">
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>}
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSave}
        onValuesChange={handleValuesChange}
        className="space-y-6"
      >
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            {field.type === "image" ? (
              <div className="flex items-center gap-4">
                <img
                  src={formData[field.name]}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
                <Upload
                  onChange={handleImageUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Replace Image</Button>
                </Upload>
              </div>
            ) : field.type === "text" ? (
              <FormInput
                label={field.label}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                type="text"
              />
            ) : field.type === "select" ? (
              <FormSelect
                label={field.label}
                name={field.name}
                required={field.required}
                options={field.options}
                placeholder={field.placeholder}
                style={field.style}
              />
            ) : field.type === "number" ? (
              <FormNumberInput
                label={field.label}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                style={field.style}
              />
            ) : field.type === "textarea" ? (
              <FormTextArea
                label={field.label}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={field.rows}
                maxLength={field.maxLength}
                style={field.style}
              />
            ) : null}
          </div>
        ))}

        <div className="flex justify-between pt-4">
          {onDelete && (
            <Button
              danger
              onClick={onDelete}
              loading={submittingDelete}
              disabled={submittingSave || submittingDelete}
              className="px-4 py-2"
            >
              Delete
            </Button>
          )}
          <div className="space-x-2">
            <Button
              onClick={onCancel}
              disabled={submittingSave || submittingDelete}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submittingSave}
              disabled={submittingSave || submittingDelete}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
            >
              Save changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DynamicForm;