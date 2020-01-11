import React, {Component} from "react";
import '../../styles.css';

import Question from "./Question"
import Timer from "./Timer"
import {GameContext} from "../GameContext"

class Round extends Component {
    constructor(props) {
        super(props);
        this.guides = ["Fill in the plank!","Fill in the plank!","Answer the question"];
        this.questions = ["It's over Anakin, I have the _____","My name is not ____","What is the best way to spend night?"];
        this.timers = [3, 4, 4];
        this.state = {round: 0};
        this.timerStopped = this.timerStopped.bind(this);
        this.content = [
            {
                guide: "Fill in the plank",
                question: "It's over anakin I have the ___________! ",
                url: "www.flickr.com/photos/44214515@N06/22155578112",
                timer: "3"
            },
            {
                guide: "Give a title to this image",
                question: "",
                url: "https://fi.wikipedia.org/wiki/Tiedosto:Life_of_George_Washington,_Deathbed.jpg",
                timer: "3"
            },
            {
                guide: "Answer the question",
                question: "If Finland had area 51, what would be its biggest secret?",
                url: "https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
                timer: "3"
            }
        ];
    }
    static contextType = GameContext;

    timerStopped() {
        console.log(this.state.round);
        if(this.state.round < 3) {
            this.setState({ round: this.state.round+1 });
        }
        return;
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
        if(this.state.round < 3) {
            const round     = this.state.round;
            const guide     = this.content[round].guide;
            const question  = this.content[round].question;
            const url       = this.content[round].url;
            const timer     = this.content[round].timer;
            return ( 
                <div>
                    {round < 3 && (
                        <div>
                            <Question url={url} guide={guide} question={question}></Question>
                            <Timer seconds={timer} timerStopped={this.timerStopped}/>
                        </div>
                    )}
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}
 
export default Round;