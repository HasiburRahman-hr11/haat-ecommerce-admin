import React, { createContext, useReducer } from 'react';
import productReducer from './productReducer';

const INITIAL_STATE = {
    products: [],
    isFetching: false,
    success:false,
    error: null
}

export const ProductContext = createContext();


const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);
    return (
        <ProductContext.Provider value={{
            products: state.products,
            isFetching: state.isFetching,
            success:state.success,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </ProductContext.Provider>
    )
};

export default ProductContextProvider;