import axios from 'axios';
import { deleteManyOrdersFailed, deleteManyOrdersStart, deleteManyOrdersSuccess, deleteOrderFailed, deleteOrderStart, deleteOrderSuccess, getAllOrdersFailed, getAllOrdersStart, getAllOrdersSuccess, updateOrderFailed, updateOrderStart, updateOrderSuccess } from './orderActions';
import { successNotify, errorNotify } from '../../utils/toastify';


// Get All Orders
export const getAllOrders = async (dispatch, token) => {
    dispatch(getAllOrdersStart());
    try {
        const { data } = await axios.get('https://hidden-crag-34912.herokuapp.com/api/orders/', {
            headers: {
                token: token
            }
        });
        dispatch(getAllOrdersSuccess(data));
    } catch (error) {
        console.log(error);
        dispatch(getAllOrdersFailed(error));
    }
}


// Update Order
export const updateOrder = async (dispatch, orderId, orderData, token) => {
    dispatch(updateOrderStart());
    try {
        const { data } = await axios.put(`https://hidden-crag-34912.herokuapp.com/api/orders/edit/${orderId}`, orderData, {
            headers: {
                token: token
            }
        });
        dispatch(updateOrderSuccess(data));
        successNotify('Order Updated Successfully');
    } catch (error) {
        console.log(error);
        dispatch(updateOrderFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Delete Order
export const deleteOrder = async (dispatch, orderId, token) => {
    dispatch(deleteOrderStart());
    try {
        const { data } = await axios.delete(`https://hidden-crag-34912.herokuapp.com/api/orders/delete/${orderId}`, {
            headers: {
                token: token
            }
        });
        dispatch(deleteOrderSuccess(data));
        successNotify('Order Deleted Successfully');
    } catch (error) {
        console.log(error);
        dispatch(deleteOrderFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


export const deleteManyOrders = async (dispatch, orders, token) => {
    dispatch(deleteManyOrdersStart());
    try {
        const { data } = await axios.post('https://hidden-crag-34912.herokuapp.com/api/orders/delete/many',
            { orderIds: orders }, {
            headers: {
                token: token
            }
        });
        dispatch(deleteManyOrdersSuccess(data));
        successNotify(`${orders.length} User${orders.length > 1 ? 's':''} Deleted Successfully`);
    } catch (error) {
        console.log(error);
        dispatch(deleteManyOrdersFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}