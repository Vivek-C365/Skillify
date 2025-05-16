import React from "react";
import { Tag, Avatar } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../features/admin/admindashboadSlice";

const StudentsTable = () => {
  const { users, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleEdit = async (record) => {
    console.log("Edit student:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("users", record.id);
      dispatch(deleteUser(record.id));
      handleSuccess("Student deleted successfully");
    } catch (error) {
      if (error) {
        handleError("Failed to delete student");
      }
    }
  };

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
  ];

  return (
    <AdminTable
      title="Students"
      description="Manage all students in the platform"
      columns={columns}
      data={users}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default StudentsTable;
