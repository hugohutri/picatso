import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "../../js/axios";
import "../../styles.css";
import { UserContext } from "./UserContext";

// Mobile view
class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { goToNextPage: false };
    this.info = { username: "", gameid: "" };

    this.onChangeRoomcode = this.onChangeRoomcode.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = UserContext;

  handleSubmit(event) {
    event.preventDefault();
    this.joinLobby(this.context);
    //  let lobbyStatus = joinLobby(info.lobbyid, info.username);
    //  res.status( 200 ).json({ lobbyStatus });
  }

  // Update the login info variable when something is changed on the field
  onChangeRoomcode(event) {
    this.info.gameid = event.target.value;
  }

  // Update the login info variable when something is changed on the field
  onChangeUsername(event) {
    this.info.username = event.target.value;
  }

  // Try to log in with given input
  async joinLobby(context) {
    const info = {
      username: this.info.username,
      lobbyid: this.info.gameid
    };

    const { data } = await axios.post("/lobby/join", { info: info });
    const lobbyStatus = data.lobbyStatus;

    if (lobbyStatus === 1) {
      // Joining was successful
      const [, setUser] = this.context;
      setUser({
        name: this.info.username,
        gameid: this.info.gameid,
        question: "",
        answer: "",
        mode: "waiting"
      });
      this.setState({ goToNextPage: true });
    }
  }

  render() {
    if (this.state.goToNextPage) return <Redirect to="/wait" />;

    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p />
            <div className="center-align flow-text" style={headerStyle}>
              Welcome to Picatso!
            </div>
            <div className="row">
              <form
                className="col s12"
                onChange={this.onChangeRoomcode}
                onSubmit={this.handleSubmit}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <input id="roomcode" type="text" className="validate" />
                    <label htmlFor="roomcode" className="active">
                      Enter the Room Code
                    </label>
                  </div>
                </div>
              </form>
              <form
                className="col s12"
                onChange={this.onChangeUsername}
                onSubmit={this.handleSubmit}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="usernamefield"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="usernamefield" className="active">
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
                <i className="material-icons right">arrow_forward</i>
                Join Lobby
              </div>
            </div>
          </div>
          <div className="row">
            <a href="/lobby" className="col s12 center"  >
              <div className="white-text"><u>Create a new lobby</u></div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
