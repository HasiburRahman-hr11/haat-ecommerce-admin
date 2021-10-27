import axios from 'axios';
import { deleteManyUsersFailed, deleteManyUsersStart, deleteManyUsersSuccess, deleteUserFailed, deleteUserStart, deleteUserSuccess, getAllUsersFailed, getAllUsersStart, getAllUsersSuccess, updateUserFailed, updateUserStart, updateUserSuccess } from './userActions';

import { successNotify, errorNotify } from '../../utils/toastify';

// Get All Users
export const getAllUsers = async (dispatch, token) => {
    dispatch(getAllUsersStart());
    try {
        const { data } = await axios.get('/api/users', {
            headers: {
                token: token
            }
        });
        dispatch(getAllUsersSuccess(data))
    } catch (error) {
        console.log(error);
        dispatch(getAllUsersFailed(error))
    }
}



// Update User
export const updateUser = async (dispatch, userId, userData, token) => {
    dispatch(updateUserStart());
    try {
        const { data } = await axios.put(`/api/users/edit/${userId}`, userData, {
            headers: {
                token: token
            }
        });
        dispatch(updateUserSuccess(data));
        successNotify('User Updated Successfully');
    } catch (error) {
        console.log(error);
        dispatch(updateUserFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Delete User
export const deleteUser = async (dispatch, userId, token) => {
    dispatch(deleteUserStart());
    try {
        const { data } = await axios.delete(`/api/users/delete/${userId}`, {
            headers: {
                token: token
            }
        });
        dispatch(deleteUserSuccess(data));
        successNotify('User Deleted Successfully');
    } catch (error) {
        console.log(error);
        dispatch(deleteUserFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}


// Delete Many User
export const deleteManyUser = async (dispatch, users, token) => {
    dispatch(deleteManyUsersStart());
    try {
        const { data } = await axios.post('/api/users/delete/many',
            { userIds: users }, {
            headers: {
                token: token
            }
        });
        dispatch(deleteManyUsersSuccess(data));
        successNotify(`${users.length} User${users.length > 1 ? 's' : ''} Deleted Successfully`);
    } catch (error) {
        console.log(error);
        dispatch(deleteManyUsersFailed(error));
        errorNotify('Opps, Something Went Wrong!');
    }
}
