import React, {Component} from "react";
import '../../styles.css';
import axios from "../../js/axios.js"

import PlayerList from "./PlayerList"

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.onClickStart = this.onClickStart.bind(this);
    }

    state = {
        loading: true,
        lobbies: []
    };

    async componentDidMount() {
        console.log("component");
        this.createLobby();
    }
    
    // Create new lobby
    async createLobby() {
        const id = await axios.get( "/lobby/create");
        console.log("id: " + id);
    };

    onClickStart() {
        console.log(":D");
    }

    render() { 
        const headerStyle = {
            fontSize: "100px",
            fontFamily: 'Bangers',
        }
        const idStyle = {
            fontSize: "80px",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const guideStyle = {
            fontSize: "25px",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const buttonStyle = {
            fontSize: "60px",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const buttonHoveredStyle = {
            fontSize: "60px",
            fontFamily: "Bangers",
            textShadow: "8px 8px 16px black"
        }
        const logoStyle = { 
            fontSize: 80,
            textShadow: "4px 4px 8px black"
        };
        return ( 
            <div>
                <div className="row">
                    <div className="center-align flow-text" style={headerStyle}>
                        PICATSO
                    </div>
                    <div className="col s6 offset-s3">
                        <div className="center-align white-text flow-text" style={guideStyle}>
                            Go to picatso.fi <br/> on your mobile device to join in <br/> using room code
                        </div>
                        <div className="center-align white-text flow-text" style={idStyle}>
                            2554
                        </div>
                    </div>
                    <div className="col s3">
                        <i
                            className="material-icons white-text hide-on-small-and-down"
                            style={logoStyle}
                        >
                            phone_android
                        </i>
                    </div>
                </div>
                <div className="row">
                    <div className="col s2 offset-s5">
                        <div className="btn-large white-text center black" style={buttonStyle} onClick={this.onClickStart}>Play</div>
                    </div>
                </div>
                <PlayerList/>
            </div>
         );
    }
}
 
export default Lobby;