import React from "react";
import { Form, Input, InputNumber, Select, Typography } from "antd";

const { Text } = Typography;
const { TextArea } = Input;

export const FormSelect = ({
  label,
  name,
  required,
  options,
  placeholder,
  showSearch = false,
  style,
  ...rest
}) => (
  <Form.Item
    label={label && (
      <span className="font-poppins font-medium text-heading text-[15px] mb-1 block">{label}</span>
    )}
    name={name}
    rules={[{ required, message: `Please select ${typeof label === 'string' ? label.toLowerCase() : name}` }]}
    style={style}
  >
    <Select
      placeholder={placeholder || `Select ${typeof label === 'string' ? label.toLowerCase() : name}`}
      showSearch={showSearch}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      className="bg-gray-50 border border-gray-300 rounded-[8px] h-12 text-black font-poppins placeholder:text-gray-400 focus:border-blue-400"
      {...rest}
    >
      {options.map((option) => (
        <Select.Option
          key={option.value || option}
          value={option.value || option}
        >
          {option.label || option}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export const FormInput = ({
  label,
  name,
  required,
  placeholder,
  type = "text",
  style,
  ...rest
}) => (
  <Form.Item
    label={label && (
      <span className="font-poppins font-medium text-heading text-[15px] mb-1 block">{label}</span>
    )}
    name={name}
    rules={[{ required, message: `Please enter ${typeof label === 'string' ? label.toLowerCase() : name}` }]}
    style={style}
  >
    <Input
      placeholder={placeholder || `Enter ${typeof label === 'string' ? label.toLowerCase() : name}`}
      type={type}
      size="large"
      className="bg-gray-50 border border-gray-300 rounded-[8px] h-12 text-black font-poppins placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-400"
      {...rest}
    />
  </Form.Item>
);

export const FormNumberInput = ({
  label,
  name,
  required,
  placeholder,
  min = 0,
  step,
  formatter,
  parser,
  style,
  ...rest
}) => (
  <Form.Item
    label={label && (
      <span className="font-poppins font-medium text-heading text-[15px] mb-1 block">{label}</span>
    )}
    name={name}
    rules={[{ required, message: `Please enter ${typeof label === 'string' ? label.toLowerCase() : name}` }]}
    style={style}
  >
    <InputNumber
      min={min}
      step={step}
      size="large"
      style={{ width: "100%" }}
      placeholder={placeholder}
      formatter={formatter}
      parser={parser}
      className="bg-gray-50 border border-gray-300 rounded-[8px] h-12 text-black font-poppins placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-400"
      {...rest}
    />
  </Form.Item>
);

export const FormTextArea = ({
  label,
  name,
  required,
  placeholder,
  rows = 4,
  showCount = false,
  maxLength,
  style,
  ...rest
}) => (
  <Form.Item
    label={label && (
      <span className="font-poppins font-medium text-heading text-[15px] mb-1 block">{label}</span>
    )}
    name={name}
    rules={[{ required, message: `Please enter ${typeof label === 'string' ? label.toLowerCase() : name}` }]}
    style={style}
  >
    <TextArea
      rows={rows}
      placeholder={placeholder}
      showCount={showCount}
      maxLength={maxLength}
      className="bg-gray-50 border border-gray-300 rounded-[8px] text-black font-poppins placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-400"
      {...rest}
    />
  </Form.Item>
);
