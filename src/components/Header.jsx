import React from "react";

const Header = ({ text, leftChild, rightChild }) => {
  return (
    <header>
      <div className="head-btn-left">{leftChild}</div>
      <div className="head-text">{text}</div>
      <div className="head-btn-right">{rightChild}</div>
    </header>
  );
};

export default Header;
