import React, {Component} from "react";
import '../../styles.css';

import Question from "./Question"
import Timer from "./Timer"
import {GameContext} from "../GameContext"

class Round extends Component {
    constructor(props) {
        super(props);
        this.guides = ["Fill in the plank!","Fill in the plank!","Answer the question"];
        this.questions = ["It's over Anakin, I have the _____","What is the best way to spend night?"];
        this.timers = [3, 4, 4];
        this.state = {round: 0};
        this.timerStopped = this.timerStopped.bind(this);

    }
    static contextType = GameContext;

    timerStopped() {
        console.log("round nyt: ", this.state.round);
        if(this.state.round < 3) {
            this.setState({ round: this.state.round+1 });
        }
        console.log("round: ", this.state.round);
        this.forceUpdate();
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
        console.log("Render kutsuttiin!");
        return ( 
            <div>
                <div>
                    <Question guide={this.guides[this.state.round]} question={this.questions[this.state.round]}></Question>
                    <Timer seconds="3" timerStopped={this.timerStopped} round={this.state.round}/>
                </div>
            </div>
         );
    }
}
 
export default Round;