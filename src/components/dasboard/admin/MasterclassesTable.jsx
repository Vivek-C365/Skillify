import React, { useState } from "react";
import { Tag, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { useOperations } from "../../../hooks/useOperations";
import ModalPage from "../../common/Modal";
import DynamicForm from "../../common/DynamicForm";
import EditAction from "../../common/EditAction";

const masterclassFields = [
  { name: "masterclassTitle", label: "Title", type: "text", placeholder: "Masterclass title" },
  { name: "name", label: "Instructor", type: "text", placeholder: "Instructor name" },
  { name: "category", label: "Category", type: "text", placeholder: "Category" },
  { name: "price", label: "Price", type: "text", placeholder: "Price" },
  { name: "duration", label: "Duration", type: "text", placeholder: "Duration (hours)" },
];

const MasterclassesTable = () => {
  const { masterclasses, loading } = useSelector((state) => state.dashboard);
  const { handleDelete, handleEdit } = useOperations(
    "masterclasses",
    "MasterClass"
  );
  const [editMasterclass, setEditMasterclass] = useState(null);

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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <EditAction onClick={() => setEditMasterclass(record.data)} />
      ),
    },
  ];

  return (
    <>
      <AdminTable
        title="Masterclasses"
        description="Manage all masterclasses in the platform"
        columns={columns}
        data={masterclasses}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editMasterclass && (
        <ModalPage
          title="Edit Masterclass"
          open={!!editMasterclass}
          onClose={() => setEditMasterclass(null)}
          onCancel={() => setEditMasterclass(null)}
        >
          <DynamicForm
            fields={masterclassFields}
            initialValues={editMasterclass}
            onSave={(updated) => {
              // handle save logic here
              setEditMasterclass(null);
            }}
            onDelete={() => {
              // handle delete logic here
              setEditMasterclass(null);
            }}
            onCancel={() => setEditMasterclass(null)}
          />
        </ModalPage>
      )}
    </>
  );
};

export default MasterclassesTable;
