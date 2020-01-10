import React, { Component } from "react";
import "../styles.css";
import "../css/materialize.css";
import axios from "../js/axios.js";
import {UserContext} from "./UserContext.js";


// Component to create new posts. Contains an input field for message
class NewPost extends Component {
  constructor(props) {
    super(props);
    this.text = {text: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Submit a post
  handleSubmit(event) {
    if(this.state == null) return;
    this.handleBackendSubmit();
  }

  // Update text-state when something is typed
  handleChange(event) {
    this.setState({text: event.target.value});
  }

  static contextType = UserContext;

  // Send the post to backend server
  handleBackendSubmit = async e => {
    const [user] = this.context;
    const newpost =   {
      name: user[0].username,
      message: this.state.text
    }
    // Transfer data with axios (XHR interface)
    await axios.post( "/posts", { post: newpost });

    // Call updatePosts-method from Home-component to update Posts
    this.props.updatePosts();
  };

  render() {
    // Get username from the context
    const [user] = this.context;
    return (
      <div className="card hoverable">
        <div className="card-content black-text">
          <span className="card-title">Create a new post, {user[0].username}!</span>
          <form className="col s12" onChange={this.handleChange}>
            <div className="input-field col s12 card">
              <textarea
                id="newpostarea"
                className="materialize-textarea"
                type="text"
                rows="4"
                maxLength = "128"
                height = "6rem"
              />
              <label htmlFor="newpostarea" />
            </div>
          </form>
        </div>
        <div className="container section center-align">
          <div className="">
            <div className="">
              <div 
              className="btn waves-effect waves-light blue darken-4"
              onClick={this.handleSubmit}>
                submit
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;