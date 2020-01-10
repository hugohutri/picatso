import React, {Component} from "react";
import "../styles.css";
import {UserContext} from "./UserContext.js";
import {Redirect} from "react-router-dom";
import axios from "../js/axios.js";

const logoStyle = { fontSize: 200 };
const logoStyleSmall = { fontSize: 100 };

// Basic login component
class Login extends Component {
    constructor(props) {
        super(props);
        this.newuser = {username: '', password: ''};
        this.success = true;
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }

    // Get info about the user from the UserContext
    static contextType = UserContext;

    // Try to log in with given input
    async tryLogin(context) {
        const info =   {
            username: this.newuser.username,
            password: this.newuser.password
        };
        const { data } = await axios.post("/users", { user: info });

        // Backend will return 0, if the user and the password do not match
        if(data.user === "0") {
            this.success = false;
            return;
        }
        // This code will run, if the back
        this.success = true;
        const [,setUser] = context;
        setUser([{username: data.user.username}]);
        this.setState(() => ({toHomepage: true}))
    }

    // Update the newuser variable when something is changed on the username field
    handleUsername(event) {
        this.newuser.username = event.target.value;
    }

    // Update the newuser variable when something is changed on the password field
    handlePassword(event) {
        this.newuser.password = event.target.value;
    }
      
    state = { toHomepage: false,}

    // Try to log in when the user submits password and username
    handleSubmit = event => { 
        this.tryLogin(this.context)
        event.preventDefault();
    };


    render() {
        // If the login was successfull, toHomePage will be true
        // and the user will be redirected to homepage
        if (this.state.toHomepage === true) {
          return <Redirect to='/' />
        }
        // Render login page
        return (
            <div className="login">
                <div className="row">
                    <div className="col s12 center-align">
                        <i className="material-icons white-text hide-on-small-and-down" style={logoStyle}>
                            person
                        </i>
                        <i className="material-icons white-text hide-on-med-and-up" style={logoStyleSmall} >
                            person
                        </i>
                    </div>
                </div>
                <div className="row">
                    <div className="col card s10 offset-s1 m6 offset-m3 center-align">
                        <h6>Login</h6>
                        <div className="row">
                            <form className="col s12" onChange={this.handleUsername} onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input id="username1" type="text" className="validate"/>
                                    <label htmlFor="username1" className="active">Username</label>
                                    </div>
                                </div>
                            </form>
                            <form className="col s12" onChange={this.handlePassword} onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input id="password" type="password" className="validate"/>
                                    <label htmlFor="password" className="active">Password</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="container section center-align">
                            <div 
                            className="btn waves-effect waves-light blue darken-4"
                            onClick={this.handleSubmit}>
                                log in
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
