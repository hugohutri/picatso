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
          questions: [],
      }
    ]);

    return (
        <GameContext.Provider value={[lobby, setLobby]}>
            {props.children}
        </GameContext.Provider>
    );
}