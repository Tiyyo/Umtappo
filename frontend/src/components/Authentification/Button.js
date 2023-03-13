import React from "react";

const Button = (props) => {
  console.log(props);
  return <button className="button">{props.value}</button>;
};

export default Button;
