import React, { Component } from "react";
import axios from "../js/axios.js";
import "../styles.css";

// Basic Test component
class Test extends Component {
  constructor(props) {
    super(props);
    this.player = { username: "", lobby: "" };
    this.createLobby = this.createLobby.bind(this);
    this.handleUserText = this.handleUserText.bind(this);
    this.handleLobbyText = this.handleLobbyText.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  state = {
    loading: true,
    lobbies: []
  };

  forceUpdateHandler() {
    this.forceUpdate();
  }

  async componentDidMount() {
    // Get lobbies from the server
    const { data } = await axios.get("/lobby");
    this.setState({ lobbies: data, loading: false });
  }

  // Create new lobby
  async createLobby() {
    // Transfer data with axios (XHR interface)
    await axios.get("/lobby/create");
    const { data } = await axios.get("/lobby");
    this.setState({ lobbies: data, loading: false });
  }

  // Try to log in with given input
  async joinLobby(context) {
    const player = {
      username: this.player.username,
      lobbyid: this.player.lobby
    };
    console.log(player);
    await axios.post("/lobby/join", { info: player });
    this.forceUpdateHandler();
    this.forceUpdate();
    const { data } = await axios.get("/lobby");
    this.setState({ lobbies: data, loading: false });
  }

  // Update the player variable when something is changed on the username field
  handleUserText(event) {
    this.player.username = event.target.value;
  }

  // Update the player variable when something is changed on the lobby field
  handleLobbyText(event) {
    this.player.lobby = event.target.value;
  }

  handleJoin = event => {
    this.joinLobby(this.context);
    event.preventDefault();
  };

  render() {
    return (
      <div className="Test">
        <div className="row">
          <div className="col card s10 offset-s1 center-align">
            {!this.state.loading &&
              this.state.lobbies.lobbies.map((lobby, index) => (
                <div key={index}>
                  <h5>Lobby: {lobby.id}</h5>
                  <div>
                    {lobby.players.map((player, index) => (
                      <p key={index}>{player}</p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="container section center-align">
          <div
            className="btn waves-effect waves-light blue darken-4"
            onClick={this.createLobby}
          >
            Create new lobby
          </div>

          <div className="row">
            <div className="col card s10 offset-s1 m6 offset-m3 center-align">
              <h6>Join the Test</h6>
              <div className="row">
                <form className="col s12" onChange={this.handleUserText}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="username" type="text" className="validate" />
                      <label htmlFor="username1" className="active">
                        Username
                      </label>
                    </div>
                  </div>
                </form>
                <form
                  className="col s12"
                  onChange={this.handleLobbyText}
                  onSubmit={this.handleJoin}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="lobbyid" type="text" className="validate" />
                      <label htmlFor="username1" className="active">
                        lobby
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="container section center-align">
                <div
                  className="btn waves-effect waves-light blue darken-4"
                  onClick={this.handleJoin}
                >
                  join
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
