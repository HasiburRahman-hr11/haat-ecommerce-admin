import { DELETE_MANY_USERS_FAILED, DELETE_MANY_USERS_START, DELETE_MANY_USERS_SUCCESS, DELETE_USER_FAILED, DELETE_USER_START, DELETE_USER_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_START, GET_ALL_USERS_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_START, UPDATE_USER_SUCCESS } from '../../constants/userConstants';

// GET All Users
export const getAllUsersStart = () => ({ type: GET_ALL_USERS_START });
export const getAllUsersSuccess = (users) => ({ type: GET_ALL_USERS_SUCCESS, payload: users });
export const getAllUsersFailed = (error) => ({ type: GET_ALL_USERS_FAILED, payload: error });


// UPDATE User
export const updateUserStart = () => ({ type: UPDATE_USER_START });
export const updateUserSuccess = (user) => ({ type: UPDATE_USER_SUCCESS, payload: user });
export const updateUserFailed = (error) => ({ type: UPDATE_USER_FAILED, payload: error });


// DELETE User
export const deleteUserStart = () => ({ type: DELETE_USER_START });
export const deleteUserSuccess = (user) => ({ type: DELETE_USER_SUCCESS, payload: user });
export const deleteUserFailed = (error) => ({ type: DELETE_USER_FAILED, payload: error });


// Delete Many users
export const deleteManyUsersStart = () => ({ type: DELETE_MANY_USERS_START });
export const deleteManyUsersSuccess = (orders) => ({ type: DELETE_MANY_USERS_SUCCESS, payload: orders });
export const deleteManyUsersFailed = (error) => ({ type: DELETE_MANY_USERS_FAILED, payload: error });

