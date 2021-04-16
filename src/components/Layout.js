import React from "react";

import ClosedSessionMenu from "./ClosedSessionMenu";
import ActiveSessionMenu from "./ActiveSessionMenu";

const Layout = (props) => {
  return (
    <React.Fragment>
      {props.session ? (
        <ActiveSessionMenu handleLogout={props.handleLogout} />
      ) : (
        <ClosedSessionMenu handleLogin={props.handleLogin} />
      )}
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
