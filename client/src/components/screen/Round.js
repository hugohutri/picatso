import React, {Component} from "react";
import '../../styles.css';

import Timer from "./Timer"
import {GameContext} from "../GameContext"

class Round extends Component {
    static contextType = GameContext;

    timerStopped() {
        // Round is over
    }

    render() { 
        const guideStyle = {
            fontSize: "3vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const questionStyle = {
            fontSize: "4vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        return ( 
            <div>
                <div>
                    <div className="col s6 offset-s3">
                        <div className="center-align white-text flow-text" style={guideStyle}>
                            Fill in the plank!
                        </div>
                        <div className="center-align white-text flow-text" style={questionStyle}>
                            "It's over Anaking, I have the _____"
                        </div>
                    </div>
                    <Timer seconds="10" timerStopped={this.timerStopped}/>
                </div>
            </div>
         );
    }
}
 
export default Round;