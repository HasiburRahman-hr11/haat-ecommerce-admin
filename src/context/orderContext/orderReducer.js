import { DELETE_MANY_ORDERS_FAILED, DELETE_MANY_ORDERS_START, DELETE_MANY_ORDERS_SUCCESS, DELETE_ORDER_FAILED, DELETE_ORDER_START, DELETE_ORDER_SUCCESS, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_START, GET_ALL_ORDERS_SUCCESS, UPDATE_ORDER_FAILED, UPDATE_ORDER_START, UPDATE_ORDER_SUCCESS } from "../../constants/orderConstants";

const orderReducer = (state, action) => {
    switch (action.type) {
        // GET ALL orders
        case GET_ALL_ORDERS_START:
            return {
                orders: [],
                isFetching: true,
                error: null
            }

        case GET_ALL_ORDERS_SUCCESS:
            return {
                orders: action.payload,
                isFetching: false,
                error: null
            }

        case GET_ALL_ORDERS_FAILED:
            return {
                orders: [],
                isFetching: false,
                error: action.payload
            }


        // UPDATE Order
        case UPDATE_ORDER_START:
            return {
                orders: [...state.orders],
                isFetching: true,
                error: null
            }
        case UPDATE_ORDER_SUCCESS:
            const oldOrders = state.orders.filter(order => order._id !== action.payload._id)
            return {
                orders: [...oldOrders, action.payload],
                isFetching: false,
                error: null
            }
        case UPDATE_ORDER_FAILED:
            return {
                orders: [...state.orders],
                isFetching: false,
                error: action.payload
            }

        // Delete Order
        case DELETE_ORDER_START:
            return {
                orders: [...state.orders],
                isFetching: true,
                error: null
            }
        case DELETE_ORDER_SUCCESS:
            return {
                orders: state.orders.filter(order => order._id !== action.payload._id),
                isFetching: false,
                error: null
            }
        case DELETE_ORDER_FAILED:
            return {
                orders: [...state.orders],
                isFetching: false,
                error: action.payload
            }


        // Delete Many Orders
        case DELETE_MANY_ORDERS_START:
            return {
                orders: [...state.orders],
                isFetching: true,
                error: null
            }
        case DELETE_MANY_ORDERS_SUCCESS:
            return {
                orders: [...action.payload],
                isFetching: false,
                error: null
            }
        case DELETE_MANY_ORDERS_FAILED:
            return {
                orders: [...state.orders],
                isFetching: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default orderReducer;