import React from "react";
import { Tag } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../../features/admin/admindashboadSlice";
import { Button } from "../../common/button";
import { Plus } from "lucide-react";
import ModalPage from "../../common/Modal";
import { AddCategoryForm } from "../../../features/teachers/pages/AddCategoryForm";

const CategoriesTable = () => {
  const { categories, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [showAddModal, setShowAddModal] = React.useState(false);

  const handleEdit = async (record) => {
    console.log("Edit category:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("Categories", record.id);
      dispatch(deleteCategory(record.id));
      handleError("Category deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);
      handleError("Failed to delete category: " + (error.message || "Unknown error"));
    }
  };

  const handleSuccess = () => {
    setShowAddModal(false);
  };

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
      render: (text) => (
        <div className="max-w-md truncate">{text}</div>
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
    </div>
  );
};

export default CategoriesTable;
