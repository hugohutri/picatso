import React, {Component} from "react";
import '../../styles.css';

import Question from "./Question"
import axios from "../../js/axios"
import Timer from "./Timer"
import Announcement from "./Announcement"
import {GameContext} from "../GameContext"

class Round extends Component {
    constructor(props) {
        super(props);
        this.guides = ["Fill in the plank!","Fill in the plank!","Answer the question"];
        this.questions = ["It's over Anakin, I have the _____","My name is not ____","What is the best way to spend night?"];
        this.timers = [3, 4, 4];
        this.state = {round: 0};
        this.timerStopped = this.timerStopped.bind(this);
        /*
        [
            {
                guide: "Fill in the plank",
                question: "It's over anakin I have the ___________! ",
                url: "",//www.flickr.com/photos/44214515@N06/22155578112",
                timer: "3"
            },
            {
                guide: "Fill in the plank",
                question: "People say I have small hands, but I make up for it with my ______.",
                url: "",//https://fi.wikipedia.org/wiki/Tiedosto:Life_of_George_Washington,_Deathbed.jpg",
                timer: "3"
            },
            {
                guide: "Answer something funny",
                question: "If Finland had area 51, what would be its biggest secret?",
                url: "",//https://pixabay.com/fi/photos/mies-secret-kasvot-salaper%C3%A4inen-4393964/",
                timer: "3"
            }
        ];*/
    }

    state = {
        content: [],
    }

    static contextType = GameContext;

    timerStopped() {
        console.log(this.state.round);
        this.setState({ round: this.state.round+1 });
    }

    async componentDidMount() {
        console.log(":DDDDDDDDDD");
        const { data } = await axios.get( "/lobby/content" );
        console.log(data);
        this.setState({content: data.content});
    }

    render() { 
        const round = this.state.round;

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

        // Render questions
        if(round < 3 && this.state.content) {
            const content = this.state.content;
            const guide     = content[round].guide;
            const question  = content[round].question;
            const url       = content[round].url;
            const timer     = content[round].timer;
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

        // Render announcement
        if(round === 3) {
            return (
                <div>
                    <div>
                        <Announcement text="Vote for the best answer!"/>
                        <Timer seconds="5" timerStopped={this.timerStopped}/>
                    </div>
                </div>
            );
        }

        // 
        return (
            <div>
            </div>
        );
    }
}
 
export default Round;