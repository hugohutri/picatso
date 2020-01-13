import React, { Component } from "react";
import "../../styles.css";

//Odotusruutu
class Score extends Component {
  render() {
    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    const logoStyle = { fontSize: "40vmin" };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p />
            <i className="material-icons black-text" style={logoStyle}>
              desktop_windows
            </i>
            <div className="center-align flow-text" style={headerStyle}>
              Results will be shown at the main screen!
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12"></div>
                </div>
              </form>
              <form className="col s12">
                <div className="row"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
