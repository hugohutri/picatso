import React, {Component} from "react";
import '../../styles.css';

import PlayerList from "./PlayerList"

class Lobby extends Component {
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
                    <div className="col s12">
                        <div className="white-text center" style={buttonStyle}>Play<br/></div>
                    </div>
                </div>
                <PlayerList/>
            </div>
         );
    }
}
 
export default Lobby;