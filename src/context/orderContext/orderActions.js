import { DELETE_MANY_ORDERS_FAILED, DELETE_MANY_ORDERS_START, DELETE_MANY_ORDERS_SUCCESS, DELETE_ORDER_FAILED, DELETE_ORDER_START, DELETE_ORDER_SUCCESS, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_START, GET_ALL_ORDERS_SUCCESS, UPDATE_ORDER_FAILED, UPDATE_ORDER_START, UPDATE_ORDER_SUCCESS } from "../../constants/orderConstants";

// GET All orders
export const getAllOrdersStart = () => ({ type: GET_ALL_ORDERS_START });
export const getAllOrdersSuccess = (orders) => ({ type: GET_ALL_ORDERS_SUCCESS, payload: orders });
export const getAllOrdersFailed = (error) => ({ type: GET_ALL_ORDERS_FAILED, payload: error });


// Update order
export const updateOrderStart = () => ({ type: UPDATE_ORDER_START });
export const updateOrderSuccess = (order) => ({ type: UPDATE_ORDER_SUCCESS, payload: order });
export const updateOrderFailed = (error) => ({ type: UPDATE_ORDER_FAILED, payload: error });


// Delete order
export const deleteOrderStart = () => ({ type: DELETE_ORDER_START });
export const deleteOrderSuccess = (order) => ({ type: DELETE_ORDER_SUCCESS, payload: order });
export const deleteOrderFailed = (error) => ({ type: DELETE_ORDER_FAILED, payload: error });


// Delete Many orders
export const deleteManyOrdersStart = () => ({ type: DELETE_MANY_ORDERS_START });
export const deleteManyOrdersSuccess = (orders) => ({ type: DELETE_MANY_ORDERS_SUCCESS, payload: orders });
export const deleteManyOrdersFailed = (error) => ({ type: DELETE_MANY_ORDERS_FAILED, payload: error });
