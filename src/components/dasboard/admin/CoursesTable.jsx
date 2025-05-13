import React from "react";
import { Tag } from "antd";
import { useFirebase } from "../../../hooks/useFirebase";
import { handleSuccess, handleError } from "../../../utils/tostify";
import AdminTable from "../../common/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../../features/admin/admindashboadSlice";

const CoursesTable = () => {
  const { courses, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleEdit = async (record) => {
    console.log("Edit course:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("CourseDetails", record.id);
      dispatch(deleteCourse(record.id));
      handleSuccess("Course deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      handleError(
        "Failed to delete course: " + (error.message || "Unknown error")
      );
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: ["data", "description"],
      key: "title",
      render: (text) => (
        <a className="font-medium">
          {text.length > 50 ? `${text.slice(0, 35)}...` : text}
        </a>
      ),
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
      dataIndex: ["data", "hourly_rate"],
      key: "price",
      render: (price) => `$${price} hours`,
    },
  ];

  return (
    <AdminTable
      title="Courses"
      description="Manage all courses in the platform"
      columns={columns}
      data={courses}
      isLoading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default CoursesTable;
