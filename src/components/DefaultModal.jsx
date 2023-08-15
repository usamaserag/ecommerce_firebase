import React, { useState } from "react";
import { Modal } from "antd";

const DefaultModal = ({ text, modalTitle, handleOkModal, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleOkModal();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>{text}</button>
      <Modal
        title={<h4 className="modal_title">{modalTitle}</h4>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};
export default DefaultModal;
