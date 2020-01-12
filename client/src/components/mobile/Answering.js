import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "../../styles.css";

import axios from "../../js/axios"
import {UserContext} from "./UserContext"

//Odotusruutu
class Answering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      goToNextPage: false
    }
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
      setInterval(async () => {
        const [user] = this.context;
        const gameid = user.gameid;
        const info = { gameid: gameid }
        const { data } = await axios.post( "/lobby/mobilecontent", { info: info} );
        if(data.round > 2) {
          this.setState({goToNextPage: true});
        } else {
          this.setState({question: data.content.question});
        }
      }, 1000);
    } catch(e) {
      console.log(e);
    }
}

  render() {
    if(this.state.goToNextPage) return <Redirect to='/' />

    const headerStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers"
    };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <p/>
            <div className="center-align flow-text" style={headerStyle}>
              {this.state.question}
            </div>
            <form className="col s12">
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
                onClick={this.handleSubmit}
              >
                <i className="material-icons right">arrow_forward</i>
                Submit answer
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Answering;
