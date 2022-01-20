import React from "react";
import { Link } from "react-router-dom";

const RouteComponent = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/diary/new"}>New</Link>
      <br />
      <Link to={"/diary/1"}>Diary</Link>
    </>
  );
};

export default RouteComponent;
