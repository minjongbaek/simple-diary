import React from "react";

const Button = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={`my-button button-${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
