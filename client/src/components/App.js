import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Nav";
import About from "./About";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import {UserProvider} from "./UserContext";

import "../styles.css";
import "../css/materialize.css";

// The main component of the app and it will contain all other components.
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Nav />
          <div className="window container blue lighten-4">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path='/myprofile' component={ Profile } />
              <Route path='/login' component={ Login } />
            </Switch>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;