import React, { Component } from "react";

import Nav from "./Nav";
import MainMenu from "./mobile/MainMenu";
import Waiting from "./mobile/Waiting";
import RoundInProgress from "./mobile/RoundInProgress";
import Answering from "./mobile/Answering";
import Background from "../images/background1.png";
import sound from "./bensound-funnysong.mp3";

// Everything rendered in the mobile will be here
class Mobile extends Component {
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
    return (
      <div>
        <Nav />
        <div style={backgroundStyle}>
          <div className="window container">
            <MainMenu />
            <audio
              id="myaudio"
              ref="audio_tag"
              src={sound}
              autoPlay
              loop
              muted
            />
            <Waiting />
            <RoundInProgress />
            <Answering />
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile;
