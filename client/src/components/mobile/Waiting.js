import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "../../styles.css";

import axios from "../../js/axios"
import {GameContext} from "../GameContext"

// Waiting for the game to start
class Waiting extends Component {
  constructor(props) {
    super(props);
    this.backendInterval = null;
    this.state = { goToNextPage: false };
  }

  static contextType = GameContext;

  async componentDidMount() {
    const [lobby] = this.context;
    const gameid = lobby[0].gameid;
    if(gameid === "") return;
    try {
      this.backendInterval = setInterval(async () => {
        const { data } = await axios.post("/lobby/getmode", { info: {gameid} } );
        const [,setLobby] = this.context;
        setLobby([{
          gameid: lobby[0].gameid,
          mode: data.mode,
          players: data.players
        }]);
        if(data.mode === "tutorial") {
          this.setState({ goToNextPage: true});
        }
      }, 2000);
    } catch(e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.backendInterval);
  }

  render() {
    if(this.state.goToNextPage) return <Redirect to='/round' />

    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    const logoStyle = { fontSize: "10vmin" };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <i className="material-icons black-text" style={logoStyle}>
              person
            </i>
            <i className="material-icons black-text" style={logoStyle}>
              person
            </i>
            <i className="material-icons black-text" style={logoStyle}>
              person
            </i>
            <div className="center-align flow-text" style={headerStyle}>
              Waiting for players...
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
            <div className="container section center-align"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Waiting;
