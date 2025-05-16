import React from "react";
import { Modal } from "antd";

const ModalPage = ({  children, open, onCancel, onOk }) => {
  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        
        onCancel={onCancel}
        footer={null} 
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalPage;
