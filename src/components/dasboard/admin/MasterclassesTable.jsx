import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";

const MasterclassesTable = () => {
  const [masterclasses, setMasterclasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchMasterclasses = async () => {
    try {
      setIsLoading(true);
      const masterclassesData = await firebase.readData("MasterClass");
      setMasterclasses(masterclassesData || []);
    } catch (error) {
      console.error("Failed to fetch masterclasses:", error);
      handleError("Failed to load masterclasses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterclasses();
  }, [firebase]);

  const handleEdit = async (record) => {
    console.log("Edit masterclass:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("MasterClass", record.id);
      handleSuccess("Masterclass deleted successfully");
      fetchMasterclasses();
    } catch (error) {
      if (error) {
        handleError("Failed to delete masterclass");
      }
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
      render: (price) => `$${price}`,
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
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default MasterclassesTable;
