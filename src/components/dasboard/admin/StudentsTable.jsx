import React, { useState } from "react";
import { Tag, Avatar, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";
import ModalPage from "../../common/Modal";
import DynamicForm from "../../common/DynamicForm";

const studentFields = [
  {
    name: "displayName",
    label: "Name",
    type: "text",
    placeholder: "Full name",
  },
  { name: "email", label: "Email", type: "email", placeholder: "Email" },
  { name: "photoURL", label: "Profile Photo", type: "image" },
  { name: "status", label: "Status", type: "text", placeholder: "Status" },
];

const StudentsTable = () => {
  const { users, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations("users", "users");
  const [editStudent, setEditStudent] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: ["data", "displayName"],
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.data?.photoURL} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: ["data", "email"],
      key: "email",
    },
    {
      title: "Enrolled Courses",
      dataIndex: ["data", "enrolledCourses"],
      key: "enrolledCourses",
      render: (courses) => (
        <Tag color="blue" key={courses}>
          {courses?.length || 0} Courses
        </Tag>
      ),
    },
    {
      title: "Progress",
      dataIndex: ["data", "progress"],
      key: "progress",
      render: (progress) => `${progress || 0}%`,
    },
    {
      title: "Status",
      dataIndex: ["data", "status"],
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"} key={status}>
          {status?.toUpperCase() || "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Edit">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setEditStudent(record.data)}
            type="text"
            style={{ color: "#1677ff" }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Students"
        description="Manage all students in the platform"
        columns={columns}
        data={users}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editStudent && (
        <ModalPage
          title="Edit Student"
          open={!!editStudent}
          onClose={() => setEditStudent(null)}
          onCancel={() => setEditStudent(null)}
        >
          <DynamicForm
            fields={studentFields}
            initialValues={editStudent}
            onSave={(updated) => {
              // handle save logic here
              setEditStudent(null);
            }}
            onDelete={() => {
              // handle delete logic here
              setEditStudent(null);
            }}
            onCancel={() => setEditStudent(null)}
          />
        </ModalPage>
      )}
    </>
  );
};

export default StudentsTable;
