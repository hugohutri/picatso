import React, { Component } from "react";
import "../../styles.css";
import axios from "../../js/axios.js";

class LobbyScore extends Component {
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

export default LobbyScore;