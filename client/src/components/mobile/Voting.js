import React, { Component } from "react";
//import {Redirect} from "react-router-dom";
import "../../styles.css";

import { GameContext } from "../GameContext";
import { UserContext } from "./UserContext";
import axios from "../../js/axios";

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
    current: 0
  };

  static contextType = GameContext;

  submitVote(player) {
    console.log(player.name);
    this.sendVote(this.sendVote);
  }

  componentDidMount() {
    const gameid = this.props.gameid;
    //this.getRound();
    if (gameid !== "") this.getData(gameid);
  }

  async getRound() {
    const [user] = this.context;
    const gameid = user.gameid;
    if (gameid === "") return;
    try {
      this.backendInterval = setInterval(async () => {
        const { data } = await axios.post("/lobby/getmode", {
          info: { gameid }
        });
        if (data.round !== this.state.round) {
          this.setState({ round: data.round });
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async getData(gameid) {
    if (this.state.round !== this.state.current) return;
    const { data } = await axios.post("/lobby/players", { info: { gameid } });
    const [lobby, setLobby] = this.context;
    const players = data.players;
    setLobby([
      {
        gameid: lobby[0].gameid,
        mode: lobby[0].mode,
        players: players,
        questions: lobby[0].questions
      }
    ]);
    let answers = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.name === this.props.name) {
        continue;
      }
      const answer = {
        text: player.answers[this.state.round],
        player: player
      };
      answers.push(answer);
    }
    this.setState({
      wait: false,
      players: players,
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
    this.setState({ wait: true, round: this.state.round + 1 });
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

    if (this.state.round !== this.state.current) {
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
}

export default Voting;
