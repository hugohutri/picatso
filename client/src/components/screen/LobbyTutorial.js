import React, { Component } from "react";
import "../../styles.css";

import Timer from "./Timer";
import { GameContext } from "../GameContext";
import axios from "../../js/axios";

class LobbyTutorial extends Component {
  constructor(props) {
    super(props);
    this.timerStopped = this.timerStopped.bind(this);
  }

  static contextType = GameContext;

  async timerStopped() {
    console.log("timerStopped called");
    //const [,setLobby] = this.context;
    //setLobby([{mode: "round"}]);
    this.props.updateLobbyState("round");
    const [lobby] = this.context;
    const info = {
      gameid: lobby[0].gameid,
      mode: "answer"
    };
    await axios.post("/lobby/setmode", { info: info });
  }

  render() {
    const guideStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const logoStyle = {
      fontSize: "25vmin",
      textShadow: "4px 4px 8px black"
    };
    return (
      <div>
        <div>
          <div className="col s6 offset-s3">
            <div
              className="center-align white-text flow-text"
              style={guideStyle}
            >
              Game is starting. User your phone to answer the questions!
            </div>
            <div className="center-align">
              <i className="material-icons white-text" style={logoStyle}>
                phone_android
              </i>
            </div>
          </div>
          <Timer seconds="5" timerStopped={this.timerStopped} />
        </div>
      </div>
    );
  }
}

export default LobbyTutorial;
