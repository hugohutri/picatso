import React, {Component} from "react";
import {UserContext} from "./UserContext.js";
import {Redirect} from "react-router-dom";

import "../styles.css";

// A page component to display very simple profile page
class Profile extends Component {
  static contextType = UserContext;

  // User will be logged out and the information is updated to the UserContext
  async logout(context) {
      const [,setUser] = context;
      setUser([{username: "guest"}]);
      this.setState(() => ({toHomepage: true}))
  }

  state = {
    toHomepage: false,
  }

  render() {
    // If the user logs out, toHomePage will be true
    // and the user will be redirected to the home page
    if (this.state.toHomepage === true) {
      return <Redirect to='/' />
    }

    // If the user is not logged in (username is "guest")
    // the user will be redirected to the login page
    const [user] = this.context;
    const username = user[0].username;
    if(username === "guest") {
        return <Redirect to='/login' />
    }

    // Render the profile page with randomized profile picture
    return (
      <div className="profile">
        <div className="row">
          <div className="container center-align pt15">
            <img
              className="responsive-img circle"
              src="https://picsum.photos/200"
              alt="Profile"
            />
          </div>
        </div>
        <div className="row">
          <div className="col card s10 offset-s1 m6 offset-m3 center-align">
            <h4>{user[0].username}</h4>
          </div>
          <div className="card col s10 offset-s1 m6 offset-m3">
            <p className="center-align">
              Active user since 2019
            </p>
          </div>
          <div className="col s12">
            <div className="container center-align">
              <div 
              className="btn waves-effect waves-light blue darken-4"
              onClick={() => this.logout(this.context)}>
                log out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
