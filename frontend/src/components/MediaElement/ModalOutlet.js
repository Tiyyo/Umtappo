import React from "react";
import { useLocation } from "react-router";

const ModalOutlet = () => {
  const location = useLocation();
  return (
    <div className="essai-modal">
      <h2>Modal here</h2>
    </div>
  );
};

export default ModalOutlet;
