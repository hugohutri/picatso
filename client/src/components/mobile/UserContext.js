import React, {useState, createContext} from 'react';

// UserContext helps to change the state of the Game
export const UserContext = createContext();

// GamePrivider gives information about the Game to its children
export const UserProvider = props => {
    const [user, setUser] = useState(
        {
            name: '',
            gameid: '',
            question: '',
            answer: '',
            mode: ''
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}