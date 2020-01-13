import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../styles.css";

import axios from "../../js/axios";
import { UserContext } from "./UserContext";

//Odotusruutu
class RoundInProgress extends Component {
  constructor(props) {
    super(props);
    this.backendInterval = null;
    this.state = { goToNextPage: false };
  }

  static contextType = UserContext;

  async componentDidMount() {
    const [user] = this.context;
    const gameid = user.gameid;
    if (gameid === "") return;
    try {
      this.backendInterval = setInterval(async () => {
        const { data } = await axios.post("/lobby/getmode", {
          info: { gameid }
        });
        const [user, setUser] = this.context;
        setUser({
          name: user.name,
          gameid: user.gameid,
          question: "",
          answer: "",
          mode: data.mode
        });
        if (data.mode === "answer") {
          this.setState({ goToNextPage: true });
        }
        if (data.mode === "ewtre") {
          this.setState({ goToNextPage: true });
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.backendInterval);
  }

  render() {
    if (this.state.goToNextPage) return <Redirect to="/answer" />;

    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    const logoStyle = { fontSize: "40vmin" };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p />
            <i className="material-icons black-text" style={logoStyle}>
              desktop_windows
            </i>
            <div className="center-align flow-text" style={headerStyle}>
              Look at the main screen!
            </div>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12"></div>
                </div>
              </form>
              <form className="col s12">
                <div className="row"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoundInProgress;
