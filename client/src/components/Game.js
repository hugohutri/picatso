import React, {Component} from "react";
import axios from "../js/axios.js";
import "../styles.css";

// Basic Game component
class Game extends Component {
    state = {
        loading: true,
        lobbies: []
    };

    async componentDidMount() {
        const { data } = await axios.get( "/lobby" );
        console.log(data);
        this.setState({lobbies: data, loading: false});
        console.log(this.state.lobbies);
        this.createLobby();
    }

    // Create new lobby
    async createLobby() {
        // Transfer data with axios (XHR interface)
        const { data } = await axios.get( "/lobby/create");
        console.log(data);
    };

    render() {
        return (
            <div className="Game">
                <div className="row">
                    <div className="col card s10 offset-s1 center-align">
                        {this.state.loading ? "loading" : JSON.stringify(this.state.lobbies)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
