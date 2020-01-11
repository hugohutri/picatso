import React, { Component } from "react";
import "../../styles.css";

//Odotusruutu
class Answering extends Component {
  constructor(props) {
    super(props);
    this.state = { goToNextPage: false };
    this.info = { answer: "" };
  }
  render() {
    const headerStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers"
    };
    return (
      <div className="login">
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <div className="center-align flow-text" style={headerStyle}>
              Tähän tulee se kysymys tai kuva johon vastataan
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
                <i class="material-icons right">arrow_forward</i>
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
