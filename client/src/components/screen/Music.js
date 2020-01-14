import React from "react";
import sound from "../../audio/bensound-funnysong.mp3";

class Music extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.audio = null;
    this.onClickAudio = this.onClickAudio.bind(this);
  }

  componentDidMount() {
    this.audio.volume = 0.0;
  }

  componentDidUpdate() {
    this.audio.play();
  }

  onClickAudio() {
    console.log("jee");
    if (this.audio.volume === 0.0) {
      this.audio.volume = 0.2;
    } else {
      this.audio.volume = 0.0;
    }
    this.forceUpdate();
  }

  render() {
    const audioStyle = {
      fontSize: "45px",
      textShadow: "2px 2px 4px black",
      position: "fixed",
      top: "10px",
      right: "10px"
    };
    return (
      <div>
        <i
          onClick={this.onClickAudio}
          style={audioStyle}
          className="material-icons white-text"
        >
          {this.audio && this.audio.volume ? "volume_up" : "volume_off"}
        </i>
        <audio
          ref={el => (this.audio = el)}
          id="myaudio"
          src={sound}
          loop
        ></audio>
      </div>
    );
  }
}

export default Music;
