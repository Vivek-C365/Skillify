import React from "react";
import { Tag, Avatar } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteInstructor } from "../../../features/admin/admindashboadSlice";

const InstructorsTable = () => {
  const { instructors, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleEdit = async (record) => {
    console.log("Edit instructor:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("Instructor", record.id);

      dispatch(deleteInstructor(record.id));
      handleSuccess("Instructor deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      handleError(
        "Failed to delete instructor: " + (error.message || "Unknown error")
      );
    }
  };

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
