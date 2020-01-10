import React, {Component} from "react";
import axios from "../js/axios.js";
import "../styles.css";

// Basic Game component
class Game extends Component {
    constructor(props) {
        super(props);
        this.createLobby = this.createLobby.bind(this);
    }

    state = {
        loading: true,
        lobbies: []
    };

    async componentDidMount() {
        const { data } = await axios.get( "/lobby" );
        this.setState({lobbies: data, loading: false});
        console.log(this.state.lobbies.lobbies.length);
    }

    // Create new lobby
    async createLobby() {
        // Transfer data with axios (XHR interface)
        const { data } = await axios.get( "/lobby/create");
        console.log(data);
        console.log(":::::::::");
        console.log(data.lobbies);
    };

    render() {
        //JSON.stringify(this.state.lobbies)
        return (
            <div className="Game">
                <div className="row">
                    <div className="col card s10 offset-s1 center-align">
                        {!this.state.loading && this.state.lobbies.lobbies.map((lobby, index) =>
                            <div key={index}>
                                <h5>{lobby.id}</h5>
                                <div>
                                    {lobby.players.map((player, index) => ( 
                                    <p key={index}>{player}</p>))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container section center-align">
                    <div 
                    className="btn waves-effect waves-light blue darken-4"
                    onClick={this.createLobby}>
                        Create new lobby
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
