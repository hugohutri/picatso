import React, {Component} from "react";
import '../../styles.css';


class Announcement extends Component {
    render() { 
        const textStyle = {
            fontSize: "6vmin",
            fontFamily: "Bangers",
            textShadow: "4px 4px 8px black"
        }
        return ( 
            <div>
                <div className="col s6 offset-s3">
                    <div className="center-align white-text flow-text" style={textStyle}>
                        {this.props.text}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Announcement;