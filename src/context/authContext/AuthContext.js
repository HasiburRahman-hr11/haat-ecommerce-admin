import React, { createContext, useReducer } from 'react';
import authReducer from './AuthReducer';

const INITIAL_STATE = {
    admin: JSON.parse(localStorage.getItem('admin')) || {},
    isFetching: false,
    error: null
}

export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{
            admin: state.admin,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;