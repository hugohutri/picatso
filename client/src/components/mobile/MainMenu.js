import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "../../styles.css";

// Mobile view
class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { goToNextPage: false };
  }


  handleSubmit() {
    this.setState({ goToNextPage: true});
  }

  render() {
    if(this.state.goToNextPage) return <Redirect to='/wait' />
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
                      Enter the Room Code
                    </label>
                  </div>
                </div>
              </form>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="text" className="validate" />
                    <label htmlFor="password" className="active">
                      Choose Your Username
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="container section center-align">
              <div
                className="btn-large waves-effect waves-light deep-orange darken-1"
                onClick={this.handleSubmit}
              >
                <i class="material-icons right">arrow_forward</i>
                Join Lobby
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
