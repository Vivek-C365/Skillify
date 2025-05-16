import React from "react";
import { Tag, Avatar } from "antd";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";

const InstructorsTable = () => {
  const { instructors, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations("instructors", "Instructor");

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
      render: (rating) => rating?.toFixed(1) || "N/A",
    },
  ];

  return (
    <AdminTable
      title="Instructors"
      description="Manage all instructors in the platform"
      columns={columns}
      data={instructors}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default InstructorsTable;
