import React from "react";

const Header = ({ text, leftChild, rightCHild }) => {
  return (
    <header>
      <div className="head-btn-left">{leftChild}</div>
      <div className="head-text">{text}</div>
      <div className="head-btn-right">{rightCHild}</div>
    </header>
  );
};

export default Header;
