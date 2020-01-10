import React, {useState, createContext} from 'react';

// GameContext helps to change the state of the Game
export const GameContext = createContext();

// GamePrivider gives information about the Game to its children
export const GameProvider = props => {
    const [game, setGame] = useState([{Gamename: 'guest'}]);
    return (
        <GameContext.Provider value={[game, setGame]}>
            {props.children}
        </GameContext.Provider>
    );
}