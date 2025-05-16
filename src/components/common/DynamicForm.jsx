import React, { useState } from "react";
import { Input, Button } from "antd";

const DynamicForm = ({ fields, initialValues = {}, onSave, onDelete, onCancel, title }) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave(form); }}>
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            {field.type === "image" ? (
              <div className="flex items-center gap-2">
                <img src={form[field.name]} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
                <Button>Click to replace</Button>
              </div>
            ) : (
              <Input
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                type={field.type}
                placeholder={field.placeholder}
                prefix={field.prefix}
                suffix={field.suffix}
              />
            )}
          </div>
        ))}
        <div className="flex justify-between pt-2">
          {onDelete && <Button danger onClick={onDelete}>Delete</Button>}
          <div>
            <Button onClick={onCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;