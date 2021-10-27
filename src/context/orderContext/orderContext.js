import React, { createContext, useReducer } from 'react';
import orderReducer from './orderReducer';

const INITIAL_STATE = {
    orders: [],
    isFetching: false,
    error: null
}

export const OrderContext = createContext();


const OrderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE);
    return (
        <OrderContext.Provider value={{
            orders: state.orders,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </OrderContext.Provider>
    )
};

export default OrderContextProvider;