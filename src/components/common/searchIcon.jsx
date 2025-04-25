import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
const SearchIcon = ({ onlcick }) => (
  <Flex gap="small" vertical>
    <Flex wrap gap="small">
      <Tooltip title="search">
        <Button
          shape="circle"
          onClick={onlcick}
          size="large"
          icon={<SearchOutlined />}
        />
      </Tooltip>
    </Flex>
  </Flex>
);
export default SearchIcon;
