import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "../../styles.css";

import axios from "../../js/axios"
import {UserContext} from "./UserContext"

//Odotusruutu
class Answering extends Component {
  constructor(props) {
    super(props);
    this.backendInterval = null;
    this.state = {
      question: "",
      waitForNext: false,
      goToNextPage: false,
    }
    this.answer = "";
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);

  }

  static contextType = UserContext;

  componentDidMount() {
    this.getContent();
  }

  async getContent() {
    const [user] = this.context;
    const gameid = user.gameid;
    const info = { gameid: gameid }
    const { data } = await axios.post( "/lobby/mobilecontent", { info: info} );
    this.setState({question: data.content.question});
    try {
      this.backendInterval = setInterval(async () => {
        const [user] = this.context;
        const gameid = user.gameid;
        const info = { gameid: gameid }
        const { data } = await axios.post( "/lobby/mobilecontent", { info: info} );
        if(data.round > 2) {
          this.setState({goToNextPage: true});
        } else if(data.content.question !== this.state.question) {
          this.setState({ waitForNext: false});
          this.setState({ question: data.content.question });
        }
      }, 1000);
    } catch(e) {
      console.log(e);
    }
}

  componentWillUnmount() {
    if(this.backendInterval) clearInterval(this.backendInterval);
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
    this.setState({ waitForNext: true});
  }

  onClickSubmit(event) {
    event.preventDefault();
    this.sendAnswer();
  }

  // Update the answer variable when something is changed on the field
  onChangeAnswer(event) {
      this.answer = event.target.value;
  }

  render() {
    if(this.state.goToNextPage) return <Redirect to='/' />

    const headerStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers"
    };
    if(!this.state.waitForNext) {
      return (
        <div className="login">
          <div className="row">
            <div className="col card s10 offset-s1 m6 offset-m3 center-align">
              <p/>
              <div>
                <div className="center-align flow-text" style={headerStyle}>
                {this.state.question}
                </div>
                <form className="col s12" onChange={this.onChangeAnswer} onSubmit={this.onClickSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="text" className="validate" />
                    <label htmlFor="password" className="active">
                      Insert clever answer:
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
    const logoStyle = { fontSize: "40vmin" };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p/>
            <i className="material-icons black-text" style={logoStyle}>
              timer
            </i>
            <div className="center-align flow-text" style={infoStyle}>
              Wait for the next question!
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
