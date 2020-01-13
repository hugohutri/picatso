import React, { Component } from "react";
import "../../styles.css";
import axios from "../../js/axios.js";

class LobbyScore extends Component {
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
        <div className="container row center-align">
          <div className="col s12 l10 offset-l1 card orange">
            <div className="col s4 m3 l3">jeee</div>
            <div className="col s4 m3 l3">jeee2</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LobbyScore;
