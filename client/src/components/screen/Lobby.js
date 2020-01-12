import React, {Component} from "react";
import '../../styles.css';

import PlayerList from "./PlayerList"
import {GameContext} from "../GameContext"
import LobbyWaiting from "./LobbyWaiting";
import LobbyTutorial from "./LobbyTutorial"
import Round from "./Round"

import axios from "../../js/axios"

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.updateLobbyState = this.updateLobbyState.bind(this);
        this.createLobby = this.createLobby.bind(this);
        this.state = {
            mode: "asd",
            gameid: ""
        }
    }

    static contextType = GameContext;

    async componentDidMount() {
        this.createLobby();
        const [lobby] = this.context;
        const mode = lobby[0].mode;
        this.setState(() => ({mode: mode}));
        const info =   {
            gameid: lobby[0].gameid,
            mode: mode
        };
        await axios.post("/lobby/setmode", { info: info } );
    }
    
    // Create new lobby
    async createLobby() {
        /* Uncomment this to create lobbies!!!
        const { data } = await axios.get( "/lobby/create");
        if(data === null) return;
        const [,setLobby] = this.context;
        setLobby([{gameid: data.id}]);
        */
        const [,setLobby] = this.context;
        setLobby([{gameid: 1234}]);
        this.setState(() => ({
            gameid: 1234
        }))
    };

    updateLobbyState(newmode) {
        this.setState(() => ({
            mode: newmode
        }))
        this.forceUpdate();
    }

    render() { 
        const headerStyle = {
            fontSize: "14vmin",
            fontFamily: 'Bangers',
        }
        const [lobby] = this.context;
        const gameid = lobby[0].gameid;
        return ( 
            <div className="lobby">
                <div className="row">
                    <div className="center-align flow-text" style={headerStyle}>
                        PICATSO
                    </div>
                    {this.state.mode === "waiting" && <LobbyWaiting gameid={gameid} updateLobbyState={this.updateLobbyState}/>}
                    {this.state.mode === "tutorial" && <LobbyTutorial updateLobbyState={this.updateLobbyState}/>}
                    {this.state.mode === "round" && <Round updateLobbyState={this.updateLobbyState}/>}
                </div>
                {gameid && <PlayerList gameid={gameid}/>}
            </div>
         );
    }
}
 
export default Lobby;