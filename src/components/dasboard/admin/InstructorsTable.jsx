import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Avatar, Card } from "antd";
import { Edit, Trash2, Mail, Phone, BookOpen, Users } from "lucide-react";
import { useFirebase } from "../../../hooks/useFirebase";
import { StatCardSkeleton } from "../../common/Skeleton";
import { handleSuccess, handleError } from "../../../utils/tostify";

const InstructorsTable = () => {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const firebase = useFirebase();

  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      const instructorsData = await firebase.readData("Instructor");
      setInstructors(instructorsData || []);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
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
      await firebase.deleteData("Instructor", record.id);
      handleSuccess("Instructor deleted successfully");
      fetchInstructors();
    } catch (error) {
      if (error) {
        handleError("Failed to delete instructor");
      }
    }
  };

  const renderMobileCard = (instructor) => (
    <Card
      key={instructor.id}
      className="mb-4 shadow-sm hover:shadow-md transition-shadow"
      actions={[
        <Button
          type="text"
          icon={<Edit size={16} />}
          onClick={() => handleEdit(instructor)}
          key="edit"
        />,
        <Button
          type="text"
          danger
          icon={<Trash2 size={16} />}
          onClick={() => handleDelete(instructor)}
          key="delete"
        />,
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <Avatar
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              instructor.data?.name
            )}&background=random`}
            size={64}
            className=""
          />
          <div className="ml-3.5">
            <h3 className="text-lg font-medium">{instructor.data?.name}</h3>
            <p className="text-sm text-gray-500">
              {instructor.data?.expertise}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail size={14} className="text-gray-400" />
            <span>{instructor.data?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone size={14} className="text-gray-400" />
            <span>{instructor.data?.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-gray-400" />
            <span className="text-sm">
              <Tag color="blue">
                {instructor.data?.totalCourses || 0} Courses
              </Tag>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400" />
            <span className="text-sm">
              {instructor.data?.students || 0} Students
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  const columns = [
    {
      title: "Instructor",
      dataIndex: ["data", "name"],
      key: "name",
      render: (text) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium">{text}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <Mail size={14} className="mr-1" />
            {record.data?.email}
          </div>
          <div className="flex items-center text-sm">
            <Phone size={14} className="mr-1" />
            {record.data?.phone}
          </div>
        </div>
      ),
    },
    {
      title: "Courses",
      dataIndex: ["data", "totalCourses"],
      key: "totalCourses",
      render: (courses) => (
        <Tag color="blue" key={courses}>
          {courses || 0} Courses
        </Tag>
      ),
    },
    {
      title: "Students",
      dataIndex: ["data", "students"],
      key: "students",
      render: (students) => students || 0,
    },
    {
      title: "expertise",
      render: (record) => (
        <div className="flex items-center">
          <div>
            <div className="text-xs text-gray-500">
              {record.data?.expertise}
            </div>
          </div>
        </div>
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
          <h2 className="text-xl font-semibold">Instructor Management</h2>
          <p className="text-gray-500">
            Manage all instructors in the platform
          </p>
        </div>
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Instructor Management</h2>
        <p className="text-gray-500">Manage all instructors in the platform</p>
      </div>

      <div className="space-y-4 hidden max-lg:block">
        {instructors.map(renderMobileCard)}
      </div>
      <div className="max-lg:hidden">
        <Table
          columns={columns}
          dataSource={instructors}
          rowKey="id"
          pagination={true}
        />
      </div>
    </div>
  );
};

export default InstructorsTable;
