import React from "react";
import { Tag } from "antd";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";
const MasterclassesTable = () => {
  const { masterclasses, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations(
    "masterclasses",
    "MasterClass"
  );

  const columns = [
    {
      title: "Title",
      dataIndex: ["data", "masterclassTitle"],
      key: "title",
      render: (text) => <a className="font-medium">{text}</a>,
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
      dataIndex: ["data", "price"],
      key: "price",
      render: (price) => <span>{price ? price : "Free"}</span>,
    },
    {
      title: "Duration",
      dataIndex: ["data", "duration"],
      key: "duration",
      render: (duration) => `${duration} hours`,
    },
  ];

  return (
    <AdminTable
      title="Masterclasses"
      description="Manage all masterclasses in the platform"
      columns={columns}
      data={masterclasses}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default MasterclassesTable;
