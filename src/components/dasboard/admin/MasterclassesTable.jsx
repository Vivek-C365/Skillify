import React from "react";
import { Tag } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteMasterclass } from "../../../features/admin/admindashboadSlice";

const MasterclassesTable = () => {
  const { masterclasses, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleEdit = async (record) => {
    console.log("Edit masterclass:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("MasterClass", record.id);
      dispatch(deleteMasterclass(record.id));
      handleSuccess("Masterclass deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      handleError(
        "Failed to delete masterclass: " + (error.message || "Unknown error")
      );
    }
  };

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
