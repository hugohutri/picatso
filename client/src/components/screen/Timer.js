import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: this.props.seconds,
      round: this.props.round
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
      //clearInterval(this.timer);
      this.props.timerStopped();

      let timeLeftVar = this.secondsToTime(this.props.seconds);
      this.setState({
        time: timeLeftVar,
        seconds: this.props.seconds
      });
      this.startTimer();
    }
  }

  render() {
    const timerStyle = {
      fontSize: "8vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black",
      position: "fixed",
      top: "0",
      left: "10px"
    };
    return (
      <div style={timerStyle}>
        <div className="white-text">
          {this.state.time.m > 0 && this.state.time.m + "min"}{" "}
          {this.state.time.s}s
        </div>
      </div>
    );
  }
}
export default Timer;
