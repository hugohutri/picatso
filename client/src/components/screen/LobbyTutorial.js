import React, {Component} from "react";
import '../../styles.css';

import Timer from "./Timer"
import {GameContext} from "../GameContext"

class LobbyTutorial extends Component {
    constructor(props) {
        super(props);
        this.timerStopped = this.timerStopped.bind(this);
    }

    static contextType = GameContext;

    timerStopped() {
        console.log("timerStopped called");
        const [,setLobby] = this.context;
        setLobby([{mode: "round"}]);
        this.props.updateLobbyState("round");
    }

    render() { 
        const guideStyle = {
            fontSize: "4vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const logoStyle = { 
            fontSize: "25vmin",
            textShadow: "4px 4px 8px black"
        };
        return ( 
            <div>
                <div>
                    <div className="col s6 offset-s3">
                        <div className="center-align white-text flow-text" style={guideStyle}>
                            This is tutorial. User your phone to answer blaa blaa blaa...
                        </div>
                        <div className="center-align">
                            <i
                                className="material-icons white-text hide-on-small-and-down"
                                style={logoStyle}
                            >
                                phone_android
                            </i>
                        </div>

                    </div>
                    <Timer seconds="3" timerStopped={this.timerStopped}/>
                </div>
            </div>
         );
    }
}
 
export default LobbyTutorial;