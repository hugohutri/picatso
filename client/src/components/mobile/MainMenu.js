import React, { Component } from "react";
import Background from "../images/background1.png";

// Mobile view
class Mobiili extends Component {
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
              Welcome to Picatso!
            </div>
            <div className="row">
              <form
                className="col s12"
                onChange={this.handleUsername}
                onSubmit={this.handleSubmit}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <input id="username1" type="text" className="validate" />
                    <label htmlFor="username1" className="active">
                      Lobby ID
                    </label>
                  </div>
                </div>
              </form>
              <form
                className="col s12"
                onChange={this.handlePassword}
                onSubmit={this.handleSubmit}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password" className="active">
                      Username
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="container section center-align">
              <div
                className="btn waves-effect waves-light deep-orange darken-1"
                onClick={this.handleSubmit}
              >
                Join Lobby
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobiili;
