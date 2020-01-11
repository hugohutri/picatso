import React, {Component} from "react";
import '../../styles.css';

import PlayerList from "./PlayerList"
import {GameContext} from "../GameContext"
import LobbyWaiting from "./LobbyWaiting";
import LobbyTutorial from "./LobbyTutorial"
import Round from "./Round"

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.updateLobbyState = this.updateLobbyState.bind(this);
        this.state = {
            mode: "asd",
        }
    }

    static contextType = GameContext;

    updateLobbyState(newmode) {
        const [lobby] = this.context;
        const mode = lobby[0].mode;
        console.log("Mode on: "+ mode)
        this.setState(() => ({
            mode: newmode
        }))
        this.forceUpdate();
    }

    componentDidMount() {
        const [lobby] = this.context;
        const mode = lobby[0].mode;
        this.setState(() => ({mode: mode}))
        console.log(this.state.mode);
    }

    render() { 
        const headerStyle = {
            fontSize: "14vmin",
            fontFamily: 'Bangers',
        }
        console.log("MODE: "+ this.state.mode);
        return ( 
            <div className="lobby">
                <div className="row">
                    <div className="center-align flow-text" style={headerStyle}>
                        PICATSO
                    </div>
                    {this.state.mode === "waiting" && <LobbyWaiting updateLobbyState={this.updateLobbyState}/>}
                    {this.state.mode === "tutorial" && <LobbyTutorial updateLobbyState={this.updateLobbyState}/>}
                    {this.state.mode === "round" && <Round updateLobbyState={this.updateLobbyState}/>}
                </div>
                <PlayerList/>
            </div>
         );
    }
}
 
export default Lobby;