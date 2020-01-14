import React, { Component } from "react";
import "../../styles.css";
import axios from "../../js/axios.js";

class LobbyWaiting extends Component {
  constructor(props) {
    super(props);
    this.onClickStart = this.onClickStart.bind(this);
  }

  async onClickStart() {
    console.log("onClickStart called");
    //const [lobby,setLobby] = this.context;
    //setLobby([{lobby}]);
    this.props.updateLobbyState("tutorial");
    const info = {
      gameid: this.props.gameid,
      mode: "tutorial"
    };
    await axios.post("/lobby/setmode", { info: info });
  }

  render() {
    const idStyle = {
      fontSize: "12vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const guideStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const buttonStyle = {
      fontSize: "60px",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const logoStyle = {
      fontSize: "12vmin",
      textShadow: "4px 4px 8px black"
    };
    const gameid = this.props.gameid;
    return (
      <div>
        <div>
          <div className="col s6 offset-s3">
            <div
              className="center-align white-text flow-text"
              style={guideStyle}
            >
              Go to "{window.location.hostname}:3000"<br /> on your mobile device to join in <br />{" "}
              using room code
            </div>
            <div className="center-align white-text flow-text" style={idStyle}>
              {gameid || "loading..."}
            </div>
          </div>
          <div className="col s3">
            <i
              className="material-icons white-text hide-on-small-and-down"
              style={logoStyle}
            >
              phone_android
            </i>
          </div>
        </div>
        <div className="container section center-align">
          <div className="col s12">
            <div
              className="btn-large white-text center black center"
              style={buttonStyle}
              onClick={this.onClickStart}
            >
              Play
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LobbyWaiting;
