import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Card } from "antd";
import { Edit, Trash2, Book, DollarSign, Users, Globe } from "lucide-react";
import { useFirebase } from "../../../hooks/useFirebase";
import { StatCardSkeleton } from "../../common/Skeleton";
import { handleError, handleSuccess } from "../../../utils/tostify";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const coursesData = await firebase.readData("CouseDetails");
      setCourses(coursesData || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [firebase]);

  const handleEdit = async (record) => {
    console.log("Edit course:", record);
  };

  const handleDelete = async (record) => {
    try {
      await firebase.deleteData("CouseDetails", record.id);
      handleSuccess("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.log(error);
      handleError("Failed to delete course");
    }
  };

  const columns = [
    {
      title: "Instructor",
      dataIndex: ["data", "name"],
      key: "name",
      render: (text) => <a className="font-medium">{text}</a>,
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
      title: "Language",
      dataIndex: ["data", "language"],
      key: "language",
    },
    {
      title: "Price ($/hr)",
      dataIndex: ["data", "hourly_rate"],
      key: "hourly_rate",
      render: (price) => `$${price}`,
    },
    {
      title: "Lessons",
      dataIndex: ["data", "lessons"],
      key: "lessons",
      render: (lessons) => lessons || 0,
    },

    
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const renderMobileCard = (course) => (
    <Card
      key={course.id}
      className="  mb-4 shadow-sm hover:shadow-md transition-shadow"
      actions={[
        <Button
          type="text"
          icon={<Edit size={16} />}
          onClick={() => handleEdit(course)}
          key="edit"
        />,
        <Button
          type="text"
          danger
          icon={<Trash2 size={16} />}
          onClick={() => handleDelete(course)}
          key="delete"
        />,
      ]}
    >
      <div className="space-y-3 ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{course.data?.name}</h3>
            <Tag color="blue" className="mt-1">
              {course.data?.category}
            </Tag>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign size={14} />
            <span>${course.data?.hourly_rate}/hr</span>
          </div>
          <div className="flex items-center gap-1">
            <Book size={14} />
            <span>{course.data?.lessons || 0} Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={14} />
            <span>{course.data?.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{course.data?.instructor || "Not assigned"}</span>
          </div>
        </div>

        {course.data?.description && (
          <p className="text-sm text-gray-500 mt-2">
            {course.data.description}
          </p>
        )}
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Course Management</h2>
          <p className="text-gray-500">Manage all courses in the platform</p>
        </div>
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Course Management</h2>
        <p className="text-gray-500">Manage all courses in the platform</p>
      </div>
      <div className="space-y-4 hidden max-lg:block">
        <div className="space-y-4 flex flex-col gap-5">{courses.map(renderMobileCard)}</div>
      </div>
      <div className="max-lg:hidden">
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} courses`,
          }}
        />
      </div>
    </div>
  );
};

export default CoursesTable;
