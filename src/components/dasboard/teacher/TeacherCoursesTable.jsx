import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFirebase } from "../../../hooks/useFirebase";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TeacherCoursesTable = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const currentTeacher = useSelector((state) => state.user.userDetails);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchTeacherCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await firebase.readData("CouseDetails");
        const teacherCourses = coursesData.filter(
          (course) => course.data.instructorId === currentTeacher.uid
        );
        setCourses(teacherCourses);
      } catch (error) {
        console.error("Error fetching teacher courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentTeacher?.uid) {
      fetchTeacherCourses();
    }
  }, [currentTeacher, firebase]);

  const handleDelete = async (courseId) => {
    try {
      await firebase.deleteData("CouseDetails", courseId);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const columns = [
    {
      title: "Course Title",
      dataIndex: ["data", "name"],
      key: "title",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.data.imageUrl || "https://via.placeholder.com/40"}
            alt={text}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span className="font-medium">{text}</span>
        </div>
      ),
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
      title: "Students",
      dataIndex: ["data", "enrolledStudents"],
      key: "students",
      render: (students) => students?.length || 0,
    },
    {
      title: "Rating",
      dataIndex: ["data", "rating"],
      key: "rating",
      render: (rating) => `${rating || 0} ★`,
    },
    {
      title: "Status",
      dataIndex: ["data", "status"],
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"} key={status}>
          {status?.toUpperCase() || "DRAFT"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit Course">
            <Link to={`/edit-course/${record.id}`}>
              <Button
                type="text"
                icon={<EditOutlined />}
                className="hover:text-blue-500"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Delete Course">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="hover:text-red-500"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-500">Manage and track your courses</p>
      </div>
      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} courses`,
        }}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default TeacherCoursesTable; 