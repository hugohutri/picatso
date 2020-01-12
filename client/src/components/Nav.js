import React, {Component} from "react";

import "../styles.css";

// Navigation bar at the top of the page
class Nav extends Component {

  render() {
    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers",
      color: "black"
    };
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper deep-orange darken-1">
            <div className="nav-wrapper container">
              <div className="center" style={headerStyle}>
               Picatso
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
