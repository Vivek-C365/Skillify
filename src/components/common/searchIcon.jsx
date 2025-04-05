import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
const SearchIcon = () => (
  <Flex gap="small" vertical>
    <Flex wrap gap="small">
      <Tooltip title="search">
        <Button shape="circle" size="large" icon={<SearchOutlined />} />
      </Tooltip>
    </Flex>
  </Flex>
);
export default SearchIcon;
