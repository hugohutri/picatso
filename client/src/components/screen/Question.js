import React, {Component} from "react";
import '../../styles.css';
import Timer from "./Timer"


class Question extends Component {

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
                <div className="col s6 offset-s3">
                    <div className="center-align white-text flow-text" style={guideStyle}>
                        {this.props.guide}
                    </div>
                    <div className="center-align white-text flow-text" style={questionStyle}>
                        {this.props.question}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Question;