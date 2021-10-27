import React, { createContext, useReducer } from 'react';
import userReducer from './userReducer';

const INITIAL_STATE = {
    users: [],
    isFetching: false,
    error: null
}

export const UserContext = createContext();


const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    return (
        <UserContext.Provider value={{
            users: state.users,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;