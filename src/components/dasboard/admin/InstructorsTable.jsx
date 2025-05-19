import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Tag, Avatar, Button, Tooltip } from "antd";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";
import ModalPage from "../../common/Modal";
import DynamicForm from "../../common/DynamicForm";
import EditAction from "../../common/EditAction";

const instructorFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Full name" },
  { name: "email", label: "Email", type: "email", placeholder: "Email" },
  { name: "photoURL", label: "Profile Photo", type: "image" },
  { name: "expertise", label: "Specialization", type: "text", placeholder: "Specialization" },
  { name: "phone", label: "Phone", type: "text", placeholder: "Phone" },
  { name: "rating", label: "Rating", type: "text", placeholder: "Rating" },
];

const InstructorsTable = () => {
  const { instructors, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations("instructors", "Instructor");
  const [editInstructor, setEditInstructor] = useState(null);
  const [submittingSave, setSubmittingSave] = useState(false);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: ["data", "name"],
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
      title: "Specialization",
      dataIndex: ["data", "expertise"],
      key: "specialization",
      render: (specialization) => (
        <Tag color="blue" key={specialization}>
          {specialization}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: ["data", "phone"],
      key: "phone",
      render: (phone) => `${phone}`,
    },
    {
      title: "Rating",
      dataIndex: ["data", "rating"],
      key: "rating",
      render: (rating) => rating || "N/A",
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
        <EditAction onClick={() => setEditInstructor(record)} />
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Instructors"
        description="Manage all instructors in the platform"
        columns={columns}
        data={instructors}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editInstructor && (
        <ModalPage
          title="Edit Instructor"
          open={!!editInstructor}
          onClose={() => setEditInstructor(null)}
          onCancel={() => setEditInstructor(null)}
        >
          <DynamicForm
            fields={instructorFields}
            initialValues={editInstructor.data}
            submittingSave={submittingSave}
            submittingDelete={submittingDelete}
            onSave={async (updated) => {
              setSubmittingSave(true);
              await handleEdit(editInstructor.id, { data: updated });
              setSubmittingSave(false);
              setEditInstructor(null);
            }}
            onDelete={async () => {
              setSubmittingDelete(true);
              await handleDelete(editInstructor.id);
              setSubmittingDelete(false);
              setEditInstructor(null);
            }}
            onCancel={() => setEditInstructor(null)}
          />
        </ModalPage>
      )}
    </>
  );
};

export default InstructorsTable;
