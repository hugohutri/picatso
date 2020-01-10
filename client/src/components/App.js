import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Game from "./Game";
import {GameProvider} from "./GameContext";

import "../styles.css";
import "../css/materialize.css";

// The main component of the app and it will contain all other components.
function App() {
  return (
    <GameProvider>
      <Router>
        <div className="app">
          <div className="window container blue lighten-4">
            <Switch>
              <Route path="/" exact component={Game} />
              <Route path="/lobby" component={Game} />
            </Switch>
          </div>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;