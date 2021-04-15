import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";
import logo from "../images/logo.png";

const ClosedSessionMenu = (props) => {
  return (
    <div className="navigation">
      <Link to="/" className="logo">
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </Link>

      <Link onClick={props.handleLogin} className="sOl">
        Sign In With <i className="fab fa-google"></i>
      </Link>
    </div>
  );
};

export default ClosedSessionMenu;
