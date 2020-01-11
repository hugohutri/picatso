import React, {Component} from "react";
import '../../styles.css';

import Timer from "./Timer"
import {GameContext} from "../GameContext"

class LobbyTutorial extends Component {
    static contextType = GameContext;

    render() { 
        const guideStyle = {
            fontSize: "4vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        return ( 
            <div>
                <div>
                    <div className="col s6 offset-s3">
                        <div className="center-align white-text flow-text" style={guideStyle}>
                            This is tutorial. User your phone to answer blaa blaa blaa...
                        </div>
                    </div>
                    <Timer/>
                </div>
            </div>
         );
    }
}
 
export default LobbyTutorial;