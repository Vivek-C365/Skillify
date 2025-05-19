import React, { useState } from "react";
import { Tag, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";
import ModalPage from "../../common/Modal";
import DynamicForm from "../../common/DynamicForm";
import EditAction from "../../common/EditAction";

const courseFields = [
  { name: "name", label: "Title", type: "text", placeholder: "Course title" },
  { name: "category", label: "Category", type: "text", placeholder: "Category" },
  { name: "hourly_rate", label: "Price", type: "text", placeholder: "Price" },
  // { name: "status", label: "Status", type: "select", placeholder: "Status" },
  { name: "description", label: "Description", type: "text", placeholder: "Description" },
];

const CoursesTable = () => {
  const { courses, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations(
    "courses",
    "CouseDetails"
  );
  const [editCourse, setEditCourse] = useState(null);
  const [submittingSave, setSubmittingSave] = useState(false);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  const columns = [
    {
      title: "Title",
      dataIndex: ["data", "name"],
      key: "title",
      render: (text) => (
        <a className="font-medium">
          {text.length > 50 ? `${text.slice(0, 35)}...` : text}
        </a>
      ),
    },
    {
      title: "Instructor",
      dataIndex: ["data", "instructorData"],
      key: "instructor",
      render: (instructor) => <span>{instructor.name}</span>,
    },
    {
      title: "Category",
      dataIndex: ["data", "category"],
      key: "category",
      render: (category) => (
        <Tag color="blue" key={category}>
          {category}
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: ["data", "description"],
      key: "description",
      render: (description) => <span>{description}</span>,
    },
    {
      title: "Status",
      dataIndex: ["data", "status"],
      key: "status",
      render: (status) => <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Price",
      dataIndex: ["data", "hourly_rate"],
      key: "price",
      render: (price) => `$${price} hours`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <EditAction onClick={() => setEditCourse(record)} />
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Courses"
        description="Manage all courses in the platform"
        columns={columns}
        data={courses}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editCourse && (
        <ModalPage
          title="Edit Course"
          open={!!editCourse}
          onClose={() => setEditCourse(null)}
          onCancel={() => setEditCourse(null)}
        >
          <DynamicForm
            fields={courseFields}
            initialValues={editCourse.data}
            submittingSave={submittingSave}
            submittingDelete={submittingDelete}
            onSave={async (updated) => {
              setSubmittingSave(true);
              await handleEdit(editCourse.id, { data: updated });
              setSubmittingSave(false);
              setEditCourse(null);
            }}
            onDelete={async () => {
              setSubmittingDelete(true);
              await handleDelete(editCourse.id);
              setSubmittingDelete(false);
              setEditCourse(null);
            }}
            onCancel={() => setEditCourse(null)}
          />
        </ModalPage>
      )}
    </>
  );
};

export default CoursesTable;
