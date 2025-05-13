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

  // student data is in nested object so we need to extract it
  const students =
    users?.map((u) => ({
      ...u.data?.data,
      id: u.id,
    })) || [];

  console.log(students);

  const handleEdit = async (record) => {
    console.log("Edit student:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("users", record.id);

      dispatch(deleteUser(record.id));
      handleSuccess("Student deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      handleError(
        "Failed to delete student: " + (error.message || "Unknown error")
      );
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "displayName",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => <Tag color="blue">{skills?.length || 0} Skills</Tag>,
    },
    {
      title: "Certificates",
      dataIndex: "certificates",
      key: "certificates",
      render: (certificates) => (
        <Tag color="purple">{certificates?.length || 0} Certificates</Tag>
      ),
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
      data={students}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default StudentsTable;
