import React, { Component } from "react";
import Background from "../images/background1.png";
import sound from "./bensound-funnysong.mp3";
import Lobby from "./screen/Lobby";

// Everyting rendered in the main screen or tv, will be here
class Screen extends Component {
  render() {
    const backgroundStyle = {
      height: "100vh",
      minHeight: "100%",
      margin: "0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundImage: "url(" + Background + ")",
      zIndex: "-1000"
    };
    const audioStyle = {
        volume: "0.01",
    };

    return (
      <div className="screen">
        <div style={backgroundStyle}>
          <Lobby />
          <audio ref="audio_tag" src={sound} autoPlay loop muted />
        </div>
      </div>
    );
  }
}

export default Screen;
