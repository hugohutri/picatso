import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../styles.css";

import axios from "../../js/axios";
import { UserContext } from "./UserContext";

//Odotusruutu
class Answering extends Component {
  constructor(props) {
    super(props);
    this.backendInterval = null;
    this.oldquestion = "";
    this.state = {
      question: "",
      waitForNext: false,
      goToNextPage: false
    };
    this.answer = "";
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
  }

  static contextType = UserContext;

  componentDidMount() {
    this.getContent();
  }

  checkIfPlayerDidSubmit(question) {
    if (
      question !== this.state.question && // The question is new
      this.oldquestion !== "" && // The new question is not the first
      !this.state.waitForNext // Player did not answer to the previous question
    ) {
      this.oldquestion = question;
      //Submit empty!
      this.answer = "-";
      this.sendAnswer();
      this.setState({ waitForNext: false });
    }
  }

  /*
      const { rounddata } = await axios.post("/lobby/getmode", {info: { gameid }});
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
  */

  async getContent() {
    const [user] = this.context;
    const gameid = user.gameid;
    const info = { gameid: gameid };
    const { data } = await axios.post("/lobby/mobilecontent", { info: info });
    const question = data.content.question;
    this.checkIfPlayerDidSubmit(question);
    this.oldquestion = question;
    this.setState({ question: question });
    try {
      this.backendInterval = setInterval(async () => {
        const [user] = this.context;
        const gameid = user.gameid;
        this.getMode(gameid);
        const info = { gameid: gameid };
        const { data } = await axios.post("/lobby/mobilecontent", {
          info: info
        });
        const question = data.content.question;
        this.checkIfPlayerDidSubmit(question);

        if (data.round > 2) {
          this.setState({ goToNextPage: true });
        } else if (question !== this.state.question) {
          this.setState({ waitForNext: false });
          this.setState({ question: question });
          this.oldquestion = question;
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async getMode(gameid) {
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
    if (data.mode === "show") {
      this.setState({ goToNextPage: true });
    }
  }

  componentWillUnmount() {
    if (this.backendInterval) clearInterval(this.backendInterval);
  }

  async sendAnswer() {
    const [user] = this.context;
    const gameid = user.gameid;
    const username = user.name;

    const info = {
      username: username,
      gameid: gameid,
      answer: this.answer
    };

    await axios.post("/lobby/submitanswer", { info: info });
  }

  onClickSubmit(event) {
    event.preventDefault();
    this.sendAnswer();
    this.setState({ waitForNext: true });
  }

  // Update the answer variable when something is changed on the field
  onChangeAnswer(event) {
    this.answer = event.target.value;
  }

  render() {
    if (this.state.goToNextPage) return <Redirect to="/vote" />;

    const headerStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers"
    };
    const logoSmallStyle = { fontSize: "15vmin" };
    const logoBigStyle = { fontSize: "40vmin" };

    if (!this.state.waitForNext) {
      return (
        <div className="login">
          <div className="row">
            <div className="col card s10 offset-s1 m6 offset-m3 center-align">
              <p />
              <div>
                <i className="material-icons black-text" style={logoSmallStyle}>
                  contact_support
                </i>
                <div className="center-align flow-text" style={headerStyle}>
                  {this.state.question}
                </div>
                <form
                  className="col s12"
                  onChange={this.onChangeAnswer}
                  onSubmit={this.onClickSubmit}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="password" type="text" className="validate" />
                      <label htmlFor="password" className="active">
                        Come up with a clever answer:
                      </label>
                    </div>
                  </div>
                </form>
                <div className="container section center-align">
                  <div
                    className="btn-large waves-effect waves-light deep-orange darken-1"
                    onClick={this.onClickSubmit}
                  >
                    <i className="material-icons right">arrow_forward</i>
                    Submit answer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const infoStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers"
    };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p />
            <i className="material-icons black-text" style={logoBigStyle}>
              timer
            </i>
            <div className="center-align flow-text" style={infoStyle}>
              Please wait
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

export default Answering;
