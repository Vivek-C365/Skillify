import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) =>
  console.log(info === null || info === void 0 ? void 0 : info.source, value);
const Searchfield = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  </Space>
);
export default Searchfield;
