import React, { Component } from "react";
import "../../styles.css";

import axios from "../../js/axios";
import Timer from "./Timer";
import { GameContext } from "../GameContext";
import Question from "./Question";

class Show extends Component {
  constructor(props) {
    super(props);
    this.q_idx = 0;
    this.p_idx = 0;
    this.q_count = 0;
    this.p_count = 0;
    this.timerStopped = this.timerStopped.bind(this);
  }

  state = {
    players: [],
    questions: [],
    answer: "",
    question: "",
    displayQuestion: true,
    displayVoting: false
  };

  static contextType = GameContext;

  async timerStopped() {
    let info = null;
    const [lobby] = this.context;

    //---------------MOVE TO RESULTS SCREEN-----------------
    if (this.q_idx >= 3) {
      // Go to next screen
      console.log("Go to next screen");
      this.props.updateLobbyState("score");

      info = {
        gameid: lobby[0].gameid,
        mode: "score"
      };
      await axios.post("/lobby/setmode", { info: info });
      return;
    }

    //---------------SHOW QUESTION-----------------
    if (this.state.displayVoting) {
      console.log("AIKA Katttoa kyssäri");
      info = {
        gameid: lobby[0].gameid,
        mode: "show"
      };
      await axios.post("/lobby/setmode", { info: info });
      this.setState({
        displayQuestion: true,
        displayVoting: false
      });
      info = {
        gameid: lobby[0].gameid,
        round: this.q_idx
      };
      console.log("round: " + this.q_idx);
      await axios.post("/lobby/setround", { info: info });
      return;
    }

    //---------------SHOW VOTING-----------------

    if (this.p_idx >= this.p_count) {
      this.p_idx = 0;
      this.q_idx += 1;
      this.setState({ displayVoting: true });
      console.log("AIKA ÄÄNESTÄÄ");
      info = {
        gameid: lobby[0].gameid,
        mode: "vote"
      };
      const question = this.state.questions[this.q_idx];
      this.setState({
        question: question
      });
      await axios.post("/lobby/setmode", { info: info });
      return;
    }

    if (this.q_idx >= this.q_count) {
      return;
    }

    //---------------SHOW NEXT QUESTION-----------------
    const answer = this.state.players[this.p_idx].answers[this.q_idx];
    const question = this.state.questions[this.q_idx];
    this.setState({
      answer: answer,
      question: question,
      displayQuestion: false
    });
    this.p_idx += 1;
  }

  async componentDidMount() {
    const [lobby] = this.context;

    // Set question list and players list
    this.state.questions = lobby[0].questions;
    this.state.players = lobby[0].players;

    // Set the first question and answer
    this.state.answer = this.state.players[0].answers[0];
    this.state.question = this.state.questions[0];

    // Set count for players and questions
    this.p_count = this.state.players.length;
    this.q_count = this.state.questions.length;

    this.getAnswers();
  }

  shuffle(arr) {
    console.log("NYT!");
    if (!(this.state.displayQuestion || this.state.displayVoting)) return arr;
    var ctr = arr.length,
      temp,
      index;
    console.log("NYT läpi!");
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  async getAnswers() {
    const [lobby] = this.context;
    /*
        const gameid = lobby[0].gameid;
        const info = { gameid: gameid, q_idx: this.state.q_idx}
        const { data } = await axios.post( "/lobby/content", { info: info} );
        */
    const players = lobby[0].players;
    this.shuffle(players);

    this.setState({ players: players });
  }

  render() {
    const smallStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const mediumStyle = {
      fontSize: "10vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const largeStyle = {
      fontSize: "12vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const logoStyle = {
      fontSize: "20vmin",
      textShadow: "4px 4px 8px black"
    };
    if (this.state.displayQuestion) {
      return (
        <div>
          <div className="center-align white-text flow-text" style={largeStyle}>
            The question was
          </div>
          <Question url="" guide="" question={this.state.question}></Question>
          <Timer seconds="7" timerStopped={this.timerStopped} />
        </div>
      );
    }
    if (this.state.displayVoting) {
      return (
        <div>
          <div className="col s6 offset-s3">
            <div className="center-align">
              <i className="material-icons white-text" style={logoStyle}>
                phone_android
              </i>
            </div>
            <div
              className="center-align white-text flow-text"
              style={mediumStyle}
            >
              Vote for the best answer with your phone!
            </div>
          </div>
          <Timer seconds="10" timerStopped={this.timerStopped} />
        </div>
      );
    }
    // Render answers
    return (
      <div>
        <div className="col s6 offset-s3">
          <div className="center-align white-text flow-text" style={smallStyle}>
            {this.state.question}
          </div>
          <div
            className="center-align white-text flow-text"
            style={mediumStyle}
          >
            {this.state.answer}
          </div>
          <div className="center-align"></div>
        </div>
        <Timer seconds="5" timerStopped={this.timerStopped} />
      </div>
    );
  }
}

export default Show;
