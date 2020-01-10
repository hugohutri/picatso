import React, {Component} from "react";

class PlayerList extends Component {
    render() { 
        const playerStyle = {
            fontSize: "30px",
            fontFamily: "Bangers",
            textShadow: "1px 1px 2px black"
        }
        const players = [
            {
              username: "labyr",
              points: "1234" 
            },
            {
              username: "jappe",
              points: "1234" 
            },
            {
              username: "liisa",
              points: "1234"
            },
            {
              username: "nalle",
              points: "1234" 
            },
            {
              username: "homer",
              points: "1234" 
            },
            {
              username: "lut",
              points: "1234" 
            },
            {
              username: "kirvesmies",
              points: "1234" 
            },
            {
              username: "sippo",
              points: "1234"
            }
          ];
        return ( 
            <div className="row">
                {players.map((player) => 
                    <div className="col s3">
                    <div className="black-text center" style={playerStyle}>{player.username}</div>
                    </div>
                )}
            </div>
         );
    }
}
 
export default PlayerList;