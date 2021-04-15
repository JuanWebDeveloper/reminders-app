import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";
import logo from "../images/logo.png";

const ActiveSessionMenu = (props) => {
  return (
    <div className="navigation">
      <Link to="/" className="logo">
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <div className="containerLogout">
        <img
          src={
            props.userDate.photo ||
            "https://3.bp.blogspot.com/-7dGg2SxOnPc/W58gx5zIm3I/AAAAAAAAFCM/ov25hkvKW0I0B-qruNE4_7wP0v7tiW5sQCLcBGAs/s1600/favicon.png"
          }
          alt="User photo"
        />
        <Link onClick={props.handleLogout} className="sOl">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default ActiveSessionMenu;
