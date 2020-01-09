import React, {useState, createContext} from 'react';

// UserContext helps to change the state of the user
export const UserContext = createContext();

// UserPrivider gives information about the user to its children
export const UserProvider = props => {
    const [user, setUser] = useState([{username: 'guest'}]);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}