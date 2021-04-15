import React from "react";

import "../styles/header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1>Welcome to reminders</h1>
      <p>To enter or create your reminders, log in with your Google account.</p>
      <button onClick={props.handleLogin}>Sign In With Google</button>
    </div>
  );
};

export default Header;
