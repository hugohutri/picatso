import React, {Component} from "react";
import '../../styles.css';

import axios from "../../js/axios"
import Timer from "./Timer"
import {GameContext} from "../GameContext"

class Show extends Component {
    constructor(props) {
        super(props);
        this.q_idx = 0;
        this.p_idx = 0;
        this.q_count = 0;
        this.p_count = 0;
        this.timerStopped = this.timerStopped.bind(this);
    }

    state = {
        players: [],
        questions: [],
        answer: "",
        question: "",
    }

    static contextType = GameContext;

    async timerStopped() {
        if(false) {
            this.props.updateLobbyState("show");
            const [lobby] = this.context;
            const info =   {
                gameid: lobby[0].gameid,
                mode: "show"
            };
            await axios.post("/lobby/setmode", { info: info } );
            return;
        }
        this.p_idx += 1;
        if(this.p_idx >= this.p_count) {
            this.p_idx = 0;
            this.q_idx += 1;
        }
        if(this.q_idx >= this.q_count) {
            return;
        }
        const answer = this.state.players[this.p_idx].answers[this.q_idx];
        const question = this.state.questions[this.q_idx];
        this.setState(
            {
                answer: answer,
                question: question
            });
    }

    async componentDidMount() {
        const [lobby] = this.context;

        // Set question list and players list
        this.state.questions = lobby[0].questions;
        this.state.players = lobby[0].players;
        
        // Set the first question and answer
        this.state.answer = this.state.players[0].answers[0];
        this.state.question = this.state.questions[0];

        // Set count for players and questions
        this.p_count = this.state.players.length;
        this.q_count = this.state.questions.length;

        this.getAnswers();
    }

    async getAnswers() {
        const [lobby] = this.context;
        /*
        const gameid = lobby[0].gameid;
        const info = { gameid: gameid, q_idx: this.state.q_idx}
        const { data } = await axios.post( "/lobby/content", { info: info} );
        */
        const players = lobby[0].players;

        this.setState({players: players});
    }

    render() { 
        const questionStyle = {
            fontSize: "6vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        const answerStyle = {
            fontSize: "10vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        // Render answers
        return ( 
            <div>
                <div className="col s6 offset-s3">
                    <div className="center-align white-text flow-text" style={questionStyle}>
                        {this.state.question}
                    </div>
                    <div className="center-align white-text flow-text" style={answerStyle}>
                        {this.state.answer}
                    </div>
                    <div className="center-align">
                    </div>
                </div>
                <Timer seconds="5" timerStopped={this.timerStopped}/>
            </div>
        );
    }
}
 
export default Show;