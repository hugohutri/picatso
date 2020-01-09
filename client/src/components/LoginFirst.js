import React, {Component} from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import "../css/materialize.css";


// If user is not logged in, this component will be shown on the home page
class LoginFirst extends Component {
    render(){
      return (
          <div className="card hoverable">
            <div className="card-content black-text">
                <span className="card-title">Log in to write a post!</span>
            </div>
            <div className="container section center-align">
                <div className="">
                  <div className="">
                      <div 
                      className="btn waves-effect waves-light blue darken-4 waves-effect waves-light">
                        <Link to="/login" className="white-text">
                            log in
                        </Link>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      );
    }
}

export default LoginFirst;