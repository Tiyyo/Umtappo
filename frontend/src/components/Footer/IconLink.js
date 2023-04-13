import React from "react";
import Button from "../Button/Button";

const IconLink = ({ children, link }) => {
  return (
    <div className="soical-link">
      <a href={link} target="_blank">
        <Button>{children}</Button>
      </a>
    </div>
  );
};

export default IconLink;
