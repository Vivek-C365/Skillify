import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Avatar, Card, Progress } from "antd";
import { Edit, Trash2, Mail, BookOpen, Calendar } from "lucide-react";
import { useFirebase } from "../../../hooks/useFirebase";
import { StatCardSkeleton } from "../../common/Skeleton";
import { handleSuccess, handleError } from "../../../utils/tostify";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  console.log(students);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const usersData = await firebase.readData("users");

      setStudents(usersData);
    } catch (error) {
      console.error("Failed to fetch students:", error);
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
      await firebase.deleteData("users", record.id);
      handleSuccess("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      if (error) {
        handleError("Failed to delete student");
      }
    }
  };

  const renderMobileCard = (student) => (
    <Card
      key={student.id}
      className="mb-4 shadow-sm hover:shadow-md transition-shadow"
      actions={[
        <Button
          type="text"
          icon={<Edit size={16} />}
          onClick={() => handleEdit(student)}
          key="edit"
        />,
        <Button
          type="text"
          danger
          icon={<Trash2 size={16} />}
          onClick={() => handleDelete(student)}
          key="delete"
        />,
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.data?.name
            )}&background=random`}
            size={64}
            className="mr-4"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium">{student.data?.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} />
              <span>{student.data?.email}</span>
            </div>
          </div>
          <Tag color={student.data?.status === "active" ? "green" : "red"}>
            {student.data?.status?.toUpperCase() || "INACTIVE"}
          </Tag>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-gray-400" />
              <span className="text-sm">Enrolled Courses</span>
            </div>
            <Tag color="blue">
              {student.data?.enrolledCourses?.length || 0} Courses
            </Tag>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-sm">Last Active</span>
            </div>
            <div className="text-sm">
              {student.data?.lastActive
                ? new Date(student.data.lastActive).toLocaleDateString()
                : "Never"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const columns = [
    {
      title: "Student",
      dataIndex: ["data", "name"],
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">
              {record.data?.email || "test"}
            </div>
          </div>
        </div>
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
      title: "Last Active",
      dataIndex: ["data", "lastActive"],
      key: "lastActive",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "Never"),
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

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Student Management</h2>
          <p className="text-gray-500">Manage all students in the platform</p>
        </div>
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Student Management</h2>
        <p className="text-gray-500">Manage all students in the platform</p>
      </div>
      <div className="space-y-4 hidden max-lg:block">
        <div className="space-y-4">{students?.map(renderMobileCard)}</div>
      </div>
      <div className="max-lg:hidden">
        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} students`,
          }}
        />
      </div>
    </div>
  );
};

export default StudentsTable;
