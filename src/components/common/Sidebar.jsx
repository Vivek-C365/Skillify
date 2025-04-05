import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const Sidebar = ({ menuItems = [] }) => {
  const items = menuItems.map((item, index) => ({
    key: String(index + 1),
    label: item.label,
  }));

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
