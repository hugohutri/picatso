import React, { Component } from "react";
//import {Redirect} from "react-router-dom";
import "../../styles.css";

import Vote from "./Vote"

class Voting extends Component {
    constructor(props) {
        super(props);
        this.votes = [
            "Vaihtoehto1",
            "vaihtoehto2",
            "SE ON MONA LISA",
            "En osaa pelata tätä :("
        ];
    }
    

    render() {
        const headerStyle = {
            fontSize: "6vmin",
            fontFamily: "Bangers"
        };

        return (
            <div className="login">
                <div className="row">
                <div className="col card s10 offset-s1 m6 offset-m3 center-align">
                    <p/>
                    <div className="center-align flow-text" style={headerStyle}>
                        voting blaa bala
                    </div>
                        {this.votes.map((vote) => 
                            <Vote text={vote}/>
                        )}
                </div>
                </div>
            </div>
        );
    }
}

export default Voting;
