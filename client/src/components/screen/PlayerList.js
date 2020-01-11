import React, {Component} from "react";

class PlayerList extends Component {
    render() { 
        const playerStyle = {
            fontSize: "4vmin",
            fontFamily: "Bangers",
            textShadow: "1vmin 1vmin 2vmin black"
        }
        const players = [
            {
              username: "labyri",
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
              username: "nöhö",
              points: "1234" 
            },
            {
              username: "kirvesmies",
              points: "1234" 
            },
            {
              username: "anomyymi",
              points: "1234"
            }
          ];
        return ( 
            <div className="container row center-align">
              <div className="col s12 l10 offset-l1 card">
                {players.map((player) => 
                  <div className="col s4 m3 l3" key={player.username}>
                    <div className="black-text center" style={playerStyle}>{player.username}</div>
                  </div>
                )}
              </div>
            </div>
         );
    }
}
 
export default PlayerList;