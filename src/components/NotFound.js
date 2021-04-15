import React from "react";

import "../styles/notFound.css";
import astronautNotFound from "../images/notFound.png";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFound-container">
        <img src={astronautNotFound} alt="Astronaut Not Found" />

        <div className="notFound-text">
          <h2>D'OH!</h2>
          <h3>We did not find what you were looking for.</h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
