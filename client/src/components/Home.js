import React, { Component } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import LoginFirst from "./LoginFirst";
import LoaderCircle from "./LoaderCircle.js";
import axios from "../js/axios.js";
import {UserContext} from "./UserContext.js";

import "../styles.css";
import "../css/materialize.css";

// This component contains all posts
class Home extends Component {
  constructor(props) {
    super(props);
    this.updatePosts = this.updatePosts.bind(this);
  }

  state = {
    loading: true,
    posts: [],
  };

  // Get posts from the backend with axios (XHR interface)
  async componentDidMount() {
    const { data } = await axios.get( "/posts" );
    this.setState({posts: data, loading: false});
  }

  // Load posts again
  async updatePosts() {
    await this.componentDidMount();
    this.forceUpdate();
  }
  
  // Get info about the user from the UserContext
  static contextType = UserContext;

  render(){
    const [user] = this.context;
    const username = user[0].username;
    // If loading is set to true, the page will show a loading animation
    // If user is not logged in (username is "guest"), the page will show show log in -option
    // Posts will render when the page receives posts from backend
    return (
      <div className="row">
        <div className="col s10 offset-s1 m10 offset-m1 l8 offset-l2">

          {(username === "guest" || username === "") ? (
            <LoginFirst/>
          ) : (
            <NewPost updatePosts={this.updatePosts}/>
          )}

          {this.state.loading || !this.state.posts ? (
            <LoaderCircle/>
          ) : (
            this.state.posts.map((post, index) => (
              <Post name={post.name} message={post.message} key={index}/>
            ))
          )}
        </div>
      </div>
    );
  }
}


export default Home;
