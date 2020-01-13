import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { UserProvider } from "./mobile/UserContext";
import Nav from "./Nav";
import MainMenu from "./mobile/MainMenu";
import Waiting from "./mobile/Waiting";
import RoundInProgress from "./mobile/RoundInProgress";
import Answering from "./mobile/Answering";
import Voting from "./mobile/Voting";
import Background from "../images/background1.png";
import sound from "./bensound-funnysong.mp3";
import { UserContext } from "./mobile/UserContext";

// Everything rendered in the mobile will be here
class Mobile extends Component {
  constructor(props) {
    super(props);
    this.username = "";
  }

  static contextType = UserContext;

  setUsername(_username) {
    this.username = _username;
  }

  render() {
    const backgroundStyle = {
      height: "100vh",
      minHeight: "100%",
      margin: "0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundImage: "url(" + Background + ")",
      zIndex: "-1000"
    };
    const [user] = this.context;
    const props = user;

    return (
      <div>
        <UserProvider>
          <Nav />
          <Router>
            <div style={backgroundStyle}>
              <div className="window container">
                <Switch>
                  <Route path="/" exact component={MainMenu} />
                  <Route path="/wait" component={Waiting} />
                  <Route path="/round" component={RoundInProgress} />
                  <Route path="/answer" component={Answering} />
                  <Route
                    path="/vote"
                    render={routeProps => <Voting {...routeProps} {...props} />}
                  />
                </Switch>
                <audio
                  id="myaudio"
                  ref="audio_tag"
                  src={sound}
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          </Router>
        </UserProvider>
      </div>
    );
  }
}

export default Mobile;
