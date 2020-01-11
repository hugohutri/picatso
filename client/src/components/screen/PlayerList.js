import React, {Component} from "react";
import {GameContext} from "../GameContext"

class PlayerList extends Component {
  static contextType = GameContext;

  componentDidMount() { 
    const [lobby] = this.context;
    this.players = lobby[0].players;
  }

  render() { 
      const playerStyle = {
        fontSize: "4vmin",
        fontFamily: "Bangers",
        textShadow: "1vmin 1vmin 2vmin black"
      }
      const playerListStyle = {
        position: "fixed",
        bottom: "0px",
        width: "100%"
      }
      return (
        <div style={playerListStyle}>
          <div className="container row center-align">
            <div className="col s12 l10 offset-l1 card black">
              {this.players && this.players.map((player) => 
                <div className="col s4 m3 l3" key={player.username}>
                  <div className="white-text center" style={playerStyle}>{player.username}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        );
  }
}
 
export default PlayerList;