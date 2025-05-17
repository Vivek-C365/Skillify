import React from "react";
import { Table, Card } from "antd";
import { StatCardSkeleton } from "./Skeleton";

const AdminTable = ({
  title,
  description,
  columns,
  data,
  isLoading,
  rowKey = "id",
  pagination = {
    pageSize: 10,
    showSizeChanger: true,
    showTotal: (total) => `Total ${total} items`,
  },
}) => {
  const renderMobileCard = (record) => {
    const mainColumns = columns || [];
    const mainColumn = mainColumns[0];
    const otherColumns = mainColumns.slice(1);

    return (
      <Card
        key={record[rowKey]}
        className="mb-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {mainColumn?.render?.(
              record.data?.[mainColumn.dataIndex?.[1]],
              record
            ) || (
              <div className="font-medium">
                {record.data?.[mainColumn.dataIndex?.[1]]}
              </div>
            )}
          </div>

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

      <div className="lg:hidden space-y-4">{data?.map(renderMobileCard)}</div>

      <div className="hidden lg:block">
        <Table
          columns={columns}
          dataSource={data}
          rowKey={rowKey}
          pagination={pagination}
          className="rounded-lg border border-gray-200"
        />
      </div>
    </div>
  );
};

export default AdminTable;