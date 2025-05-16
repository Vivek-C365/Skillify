import React from "react";
import { Tag } from "antd";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";

const CoursesTable = () => {
  const { courses, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations(
    "courses",
    "CouseDetails"
  );

  const columns = [
    {
      title: "Title",
      dataIndex: ["data", "description"],
      key: "title",
      render: (text) => (
        <a className="font-medium">
          {text.length > 50 ? `${text.slice(0, 35)}...` : text}
        </a>
      ),
    },
    {
      title: "Instructor",
      dataIndex: ["data", "name"],
      key: "instructor",
      render: (text) => <span>{text}</span>,
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
      title: "Price",
      dataIndex: ["data", "hourly_rate"],
      key: "price",
      render: (price) => `$${price} hours`,
    },
  ];

  return (
    <AdminTable
      title="Courses"
      description="Manage all courses in the platform"
      columns={columns}
      data={courses}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default CoursesTable;
