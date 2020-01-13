import React, { Component } from "react";
//import {Redirect} from "react-router-dom";
import "../../styles.css";

import { GameContext } from "../GameContext";
import axios from "../../js/axios";
import { UserContext } from "./UserContext";

class Voting extends Component {
  constructor(props) {
    super(props);
    this.votes = [
      "Vaihtoehto",
      "vaihtoehto2",
      "SE ON MONA LISA",
      "En osaa pelata tätä :("
    ];
    this.submitVote = this.submitVote.bind(this);
  }

  state = {
    players: [],
    answers: [],
    choice: "",
    wait: true,
    round: 0,
    current: 0,
    mode: "show",
    isvoted: false
  };

  static contextType = UserContext;

  submitVote(player) {
    console.log(player.name);
    this.sendVote(this.sendVote);
    this.setState({ isvoted: true, wait: true });
  }

  componentDidMount() {
    const [user] = this.context;
    const gameid = user.gameid;

    if (gameid) {
      this.getData(gameid);
      this.updateMode(gameid);
    }
  }

  async updateRound(gameid) {
    const { data } = await axios.post("/lobby/getround", {
      info: { gameid }
    });
    console.log("ROUND");
    console.log(data.round);
    if (data.round !== this.state.round) {
      this.setState({ round: data.round });
    }
  }

  updateMode(gameid) {
    try {
      this.backendInterval = setInterval(async () => {
        this.updateRound(gameid);
        this.getMode(gameid);
        this.updateAnswers();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async getMode(gameid) {
    if (!gameid) return;
    const { data } = await axios.post("/lobby/getmode", { info: { gameid } });

    this.setState({ mode: data.mode });
    if (data.mode !== "vote") this.setState({ isvoted: false });
  }

  async getData(gameid) {
    const { data } = await axios.post("/lobby/players", { info: { gameid } });
    this.setState({ players: data.players });
    /*
    const [lobby, setLobby] = this.context;
    setLobby([
      {
        gameid: lobby[0].gameid,
        mode: lobby[0].mode,
        players: players,
        questions: lobby[0].questions
      }
    ]);
    */
    this.updateAnswers();
  }

  updateAnswers() {
    let answers = [];
    const [user] = this.context;
    for (let i = 0; i < this.state.players.length; i++) {
      const player = this.state.players[i];
      if (player.name === user.name) {
        continue;
      }
      const answer = {
        text: player.answers[this.state.round],
        player: player
      };
      answers.push(answer);
    }
    this.setState({
      answers: answers
    });
  }

  // Send the vote to the server
  async sendVote() {
    const info = {
      gameid: this.props.gameid,
      choice: this.state.choice
    };

    //await axios.post("/lobby/vote", { info: info });
  }

  render() {
    const headerStyle = {
      fontSize: "5vmin",
      fontFamily: "Bangers"
    };
    const buttonStyle = {
      margin: "5px 0px"
    };

    const logoStyle = { fontSize: "10vmin" };
    const answers = this.state.answers;

    if (this.state.mode === "show") {
      return (
        <div className="login">
          <div className="row">
            <div className="col card s10 offset-s1 m6 offset-m3 center-align">
              <p />
              <i className="material-icons black-text" style={logoStyle}>
                desktop_windows
              </i>
              <div className="center-align flow-text" style={headerStyle}>
                Waiting for the voting to start
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
    if (this.state.mode === "vote" && !this.state.isvoted) {
      return (
        <div className="">
          <div className="row">
            <div className="col card s10 offset-s1 m6 offset-m3 center-align">
              <p />
              <div className="center-align flow-text" style={headerStyle}>
                Choose the best answer:
              </div>
              {answers &&
                answers.map((vote, index) => (
                  <div
                    className="btn-large s12 col black-text center deep-orange word-break"
                    style={buttonStyle}
                    key={index}
                    voteid={vote.text}
                    onClick={() => {
                      this.submitVote(vote.player);
                    }}
                  >
                    {vote.text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p />
            <i className="material-icons black-text" style={logoStyle}>
              desktop_windows
            </i>
            <div className="center-align flow-text" style={headerStyle}>
              Vote submitted! Waiting for the next one...
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

export default Voting;
