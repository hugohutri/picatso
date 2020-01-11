import React, {useState, createContext} from 'react';

// GameContext helps to change the state of the Game
export const GameContext = createContext();

// GamePrivider gives information about the Game to its children
export const GameProvider = props => {
    const [lobby, setLobby] = useState([
        {
            gameid: '',
            mode: 'waiting',
            players: [],
            /*players: [{
                username: "gamer123",
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
              }] */
        }
    ]);

    return (
        <GameContext.Provider value={[lobby, setLobby]}>
            {props.children}
        </GameContext.Provider>
    );
}