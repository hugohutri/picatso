import React, { Component } from "react";
import "../../styles.css";

//Odotusruutu
class Waiting extends Component {
  render() {
    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <div className="center-align flow-text" style={headerStyle}>
              Please wait until all players are connected...
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
            <div className="container section center-align"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Waiting;
