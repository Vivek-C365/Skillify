import React from "react";
import { Space, Table, Tag, Button, Card } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { StatCardSkeleton } from "./Skeleton";

const AdminTable = ({
  title,
  description,
  columns,
  data,
  isLoading,
  onEdit,
  onDelete,
  rowKey = "id",
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
  },
}) => {
  const tableColumns = columns || [];
  if (!columns.find(col => col.key === "actions")) {
    tableColumns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => onEdit?.(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => onDelete?.(record)}
          />
        </Space>
      ),
    });
  }

  const renderMobileCard = (record) => {
    const mainColumns = columns.filter(col => col.key !== "actions");
    const mainColumn = mainColumns[0]; // First column is usually the main identifier
    const otherColumns = mainColumns.slice(1);

    return (
      <Card
        key={record[rowKey]}
        className="mb-4 shadow-sm hover:shadow-md transition-shadow"
        actions={[
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => onEdit?.(record)}
            key="edit"
          />,
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => onDelete?.(record)}
            key="delete"
          />,
        ]}
      >
        <div className="space-y-4">
          {/* Main content */}
          <div className="flex items-center justify-between">
            {mainColumn?.render?.(record.data?.[mainColumn.dataIndex?.[1]], record) || (
              <div className="font-medium">{record.data?.[mainColumn.dataIndex?.[1]]}</div>
            )}
          </div>

          {/* Other columns */}
          <div className="grid grid-cols-2 gap-2">
            {otherColumns.map((col) => (
              <div key={col.key} className="space-y-1">
                <div className="text-xs text-gray-500">{col.title}</div>
                <div className="text-sm">
                  {col.render
                    ? col.render(record.data?.[col.dataIndex?.[1]], record)
                    : record.data?.[col.dataIndex?.[1]]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {data?.map(renderMobileCard)}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <Table
          columns={tableColumns}
          dataSource={data}
          rowKey={rowKey}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default AdminTable; 