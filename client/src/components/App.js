import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Test from "./Test";
import Mobile from "./Mobile";
import Screen from "./Screen";
import {GameProvider} from "./GameContext";

import "../styles.css";
import "../css/materialize.css";

// The main component of the app and it will contain all other components.
function App() {
  return (
    <GameProvider>
      <Router>
        <div className="app">
            <Switch>
              <Route path="/lobby" exact component={Screen} />
              <Route path="/test" exact component={Test} />
              <Route path="/" component={Mobile} />
            </Switch>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;