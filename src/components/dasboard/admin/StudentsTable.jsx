import React, { useEffect, useState } from "react";
import { Tag, Avatar } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const studentsData = await firebase.readData("Students");
      setStudents(studentsData || []);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      handleError("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [firebase]);

  const handleEdit = async (record) => {
    console.log("Edit student:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("Students", record.id);
      handleSuccess("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      if (error) {
        handleError("Failed to delete student");
      }
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
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default StudentsTable;
