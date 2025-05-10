import React, { useEffect, useState } from "react";
import { Tag, Avatar } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";

const InstructorsTable = () => {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      const instructorsData = await firebase.readData("Instructors");
      setInstructors(instructorsData || []);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
      handleError("Failed to load instructors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [firebase]);

  const handleEdit = async (record) => {
    console.log("Edit instructor:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("Instructors", record.id);
      handleSuccess("Instructor deleted successfully");
      fetchInstructors();
    } catch (error) {
      if (error) {
        handleError("Failed to delete instructor");
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
      title: "Specialization",
      dataIndex: ["data", "specialization"],
      key: "specialization",
      render: (specialization) => (
        <Tag color="blue" key={specialization}>
          {specialization}
        </Tag>
      ),
    },
    {
      title: "Experience",
      dataIndex: ["data", "experience"],
      key: "experience",
      render: (experience) => `${experience} years`,
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
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default InstructorsTable;
