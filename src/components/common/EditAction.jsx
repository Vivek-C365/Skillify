import React from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditAction = ({ onClick }) => (
  <Tooltip title="Edit">
    <Button
      shape="circle"
      icon={<EditOutlined />}
      onClick={onClick}
      type="text"
      style={{ color: "#1677ff" }}
    />
  </Tooltip>
);

export default EditAction; 