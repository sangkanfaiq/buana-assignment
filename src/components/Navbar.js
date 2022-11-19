import React from "react";
import "./styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="images" />
          <h1>Gallery</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
