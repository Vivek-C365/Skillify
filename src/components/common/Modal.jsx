import React, { Children, useState } from "react";
import { Button, Flex, Modal } from "antd";
import SearchIcon from "./searchIcon";
const ModalPage = ({ icon, children }) => {
  const [openResponsive, setOpenResponsive] = useState(false);
  return (
    <Flex>
      <Button
        className="w-[50px] aspect-square !rounded-full"
        onClick={() => setOpenResponsive(true)}
      >
        {icon}
      </Button>
      <Modal
        centered
        open={openResponsive}
        onCancel={() => setOpenResponsive(false)}
        closable={false}
        footer={false}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}// This removes the default footer including the OK button
      >
        {children}
      </Modal>
    </Flex>
  );
};
export default ModalPage;
