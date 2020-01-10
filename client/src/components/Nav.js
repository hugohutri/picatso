import React from "react";
import { Link } from "react-router-dom";

import "../styles.css";

// Navigation bar at the top of the page
function Nav() {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue lighten-2">
          <div className="nav-wrapper container">
            <div className="center">
                PICATSO
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
