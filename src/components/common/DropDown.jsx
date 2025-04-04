import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DropDown = ({ items, triggerContent = "Dropdown" }) => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {triggerContent}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default DropDown;