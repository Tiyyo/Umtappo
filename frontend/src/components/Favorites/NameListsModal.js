import React from "react";

const NameListsModal = (props) => {
  const { isOpen, getCloseState } = props;

  const closeModal = () => {
    getCloseState("false");
  };
  return (
    <div
      className="name-modal"
      style={isOpen ? { top: "150px" } : { top: "-100vh" }}
    >
      <div className="close-icon" onClick={closeModal()}>
        Je ferme
      </div>
      <input type="text" />
      <div className="confirm-icon">Je confirme</div>
    </div>
  );
};

export default NameListsModal;
