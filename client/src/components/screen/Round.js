import React, { Component } from "react";
import "../../styles.css";

import Question from "./Question";
import axios from "../../js/axios";
import Timer from "./Timer";
import Announcement from "./Announcement";
import { GameContext } from "../GameContext";

class Round extends Component {
  constructor(props) {
    super(props);
    this.guides = [
      "Fill in the blank!",
      "Fill in the blank!",
      "Answer the question"
    ];
    this.questions = [
      "It's over Anakin, I have the _____",
      "My name is not ____",
      "What is the best way to spend night?"
    ];
    this.timers = [3, 4, 4];
    this.state = { round: 0 };
    this.questions = [];
    this.timerStopped = this.timerStopped.bind(this);
    /*
        [
            {
                guide: "Fill in the plank",
                question: "It's over anakin I have the ___________! ",
                url: "",//www.flickr.com/photos/44214515@N06/22155578112",
                timer: "3"
            },
            {
                guide: "Fill in the plank",
                question: "People say I have small hands, but I make up for it with my ______.",
                url: "",//https://fi.wikipedia.org/wiki/Tiedosto:Life_of_George_Washington,_Deathbed.jpg",
                timer: "3"
            },
            {
                guide: "Answer something funny",
                question: "If Finland had area 51, what would be its biggest secret?",
                url: "",//https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
                timer: "3"
            }
        ];*/
  }

  state = {
    content: null
  };

  static contextType = GameContext;

  async timerStopped() {
    if (this.state.round === 3) {
      this.props.updateLobbyState("show");
      const [lobby] = this.context;
      const info = {
        gameid: lobby[0].gameid,
        mode: "show"
      };
      await axios.post("/lobby/setmode", { info: info });
      return;
    }
    this.setState({ round: this.state.round + 1 });
    if (this.state.round < 3) {
      this.getContent();
    }
  }

  async componentDidMount() {
    this.getContent();
  }

  async getContent() {
    const [lobby] = this.context;
    const gameid = lobby[0].gameid;
    const info = { gameid: gameid, round: this.state.round };
    const { data } = await axios.post("/lobby/content", { info: info });
    this.setState({ content: data.content });

    // Send questions to the context
    this.questions.push(data.content.question);
    const [, setLobby] = this.context;
    setLobby([
      {
        gameid: lobby[0].gameid,
        mode: lobby[0].mode,
        players: lobby[0].players,
        questions: this.questions
      }
    ]);
  }

  render() {
    const round = this.state.round;

    // Render questions
    if (round < 3 && this.state.content) {
      const content = this.state.content;
      const guide = content.guide;
      const question = content.question;
      const url = content.url;
      const timer = content.timer;
      return (
        <div>
          {round < 3 && (
            <div>
              <Question url={url} guide={guide} question={question}></Question>
              <Timer seconds={timer} timerStopped={this.timerStopped} />
            </div>
          )}
        </div>
      );
    }

    // Render announcement
    if (round === 3) {
      return (
        <div>
          <div>
            <Announcement text="Time to vote for the best answer!" />
            <Timer seconds="3" timerStopped={this.timerStopped} />
          </div>
        </div>
      );
    }

    // else
    return <div></div>;
  }
}

export default Round;
