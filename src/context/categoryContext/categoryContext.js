import React, { createContext, useReducer } from 'react';
import categoryReducer from './categoryReducer';

const INITIAL_STATE = {
    categories: [],
    isFetching: false,
    error: null
}

export const CategoryContext = createContext();


const CategoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, INITIAL_STATE);
    return (
        <CategoryContext.Provider value={{
            categories: state.categories,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </CategoryContext.Provider>
    )
};

export default CategoryContextProvider;