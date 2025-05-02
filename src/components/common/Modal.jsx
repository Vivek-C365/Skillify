import React from "react";
import { Modal } from "antd";

const ModalPage = ({  children, open, onCancel, onOk }) => {
  return (
    <>
      <Modal
        title="Add Instructor"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null} // Assuming the form has its own buttons
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalPage;
