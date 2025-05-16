import React, { useState } from "react";
import { Tag, Tooltip, Button } from "antd";
import AdminTable from "../../common/AdminTable";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";
import ModalPage from "../../common/Modal";
import { AddCategoryForm } from "../../../features/teachers/pages/AddCategoryForm";
import { useOperations } from "../../../hooks/useOperations";
import DynamicForm from "../../common/DynamicForm";
import { EditOutlined } from "@ant-design/icons";
import EditAction from "../../common/EditAction";

const CategoriesTable = () => {
  const { categories, loading } = useSelector((state) => state.dashboard);
  const [showAddModal, setShowAddModal] = useState(false);
  const { fetchData, handleDelete, handleEdit } = useOperations(
    "categories",
    "Categories"
  );
  const [editCategory, setEditCategory] = useState(null);
  // console.log(editCategory);

  const handleSuccess = () => {
    setShowAddModal(false);
    fetchData();
  };

  const categoryFields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Category name",
    },
    { name: "slug", label: "Slug", type: "text", placeholder: "Slug" },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Description",
    },
    { name: "imageUrl", label: "Image", type: "image" },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: ["data", "name"],
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.data?.imageUrl}
            alt={text}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Slug",
      dataIndex: ["data", "slug"],
      key: "slug",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Description",
      dataIndex: ["data", "description"],
      key: "description",
      render: (text) => <div className="max-w-md truncate">{text}</div>,
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <EditAction onClick={() => setEditCategory(record.data)} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600">Manage all categories in the platform</p>
        </div>
        <Button
          variant="outline"
          className="!text-black"
          size="lg"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Add Category
        </Button>
      </div>

      <AdminTable
        columns={columns}
        data={categories}
        isLoading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <ModalPage
          title="Add New Category"
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onCancel={() => setShowAddModal(false)}
        >
          <AddCategoryForm
            onSuccess={handleSuccess}
            onClose={() => setShowAddModal(false)}
          />
        </ModalPage>
      )}
      {editCategory && (
        <ModalPage
          title="Edit Category"
          open={!!editCategory}
          onClose={() => setEditCategory(null)}
          onCancel={() => setEditCategory(null)}
        >
          <DynamicForm
            fields={categoryFields}
            initialValues={editCategory}
            onSave={(updated) => {
              handleEdit(editCategory.id, { data: updated });
              setEditCategory(null);
            }}
            onDelete={() => {
              handleDelete(editCategory.id);
              setEditCategory(null);
            }}
            onCancel={() => setEditCategory(null)}
          />
        </ModalPage>
      )}
    </div>
  );
};

export default CategoriesTable;
