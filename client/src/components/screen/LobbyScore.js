import React, { Component } from "react";
import { GameContext } from "../GameContext";
import axios from "../../js/axios";

class LobbyScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  static contextType = GameContext;

  async componentDidMount() {
    const [lobby] = this.context;
    this.getPlayers(lobby[0].gameid);
  }

  async getPlayers(gameid) {
    const { data } = await axios.post("/lobby/players", { info: { gameid } });
    this.setState({ players: data.players });
  }

  render() {
    const playerStyle = {
      fontSize: "4vmin",
      fontFamily: "Bangers",
      textShadow: "1vmin 1vmin 2vmin black"
    };
    const headerStyle = {
      fontSize: "6vmin",
      fontFamily: "Bangers",
      textShadow: "4px 4px 8px black"
    };
    const boxStyle = {
      margin: "0"
    };
    const players = this.state.players;
    return (
      <div>
        <div className="container row center-align">
          <div className="col s12 m12 l10 offset-l1">
            <div
              className="center-align white-text flow-text"
              style={headerStyle}
            >
              Results
            </div>
            {players.map(player => (
              <div className="col s4 m3 l2" style={boxStyle} key={player.name}>
                <div className="col s10 offset-s1 card black">
                  <div className="white-text center" style={playerStyle}>
                    {player.name}
                  </div>
                  <div className="white-text center" style={playerStyle}>
                    {player.points}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default LobbyScore;
