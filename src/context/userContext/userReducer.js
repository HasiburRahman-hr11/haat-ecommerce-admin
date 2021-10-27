import { DELETE_MANY_USERS_FAILED, DELETE_MANY_USERS_START, DELETE_MANY_USERS_SUCCESS, DELETE_USER_FAILED, DELETE_USER_START, DELETE_USER_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_START, GET_ALL_USERS_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_START, UPDATE_USER_SUCCESS } from '../../constants/userConstants';

const userReducer = (state, action) => {
    switch (action.type) {

        // Get All Users
        case GET_ALL_USERS_START:
            return {
                users: [],
                isFetching: true,
                error: action.payload
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                users: action.payload,
                isFetching: false,
                error: null
            }

        case GET_ALL_USERS_FAILED:
            return {
                users: [],
                isFetching: false,
                error: action.payload
            }


        // UPDATE User
        case UPDATE_USER_START:
            return {
                users: [...state.users],
                isFetching: true,
                error: null
            }
        case UPDATE_USER_SUCCESS:
            const oldUsers = state.users.filter(user => user._id !== action.payload._id)
            return {
                users: [...oldUsers, action.payload],
                isFetching: false,
                error: null
            }
        case UPDATE_USER_FAILED:
            return {
                users: [...state.users],
                isFetching: false,
                error: action.payload
            }


        // Delete User
        case DELETE_USER_START:
            return {
                users: [...state.users],
                isFetching: true,
                error: null
            }
        case DELETE_USER_SUCCESS:
            return {
                users: state.users.filter(user => user._id !== action.payload._id),
                isFetching: false,
                error: null
            }
        case DELETE_USER_FAILED:
            return {
                users: [...state.users],
                isFetching: false,
                error: action.payload
            }

             // Delete Many users
        case DELETE_MANY_USERS_START:
            return {
                users: [...state.users],
                isFetching: true,
                error: null
            }
        case DELETE_MANY_USERS_SUCCESS:
            return {
                users: [...action.payload],
                isFetching: false,
                error: null
            }
        case DELETE_MANY_USERS_FAILED:
            return {
                users: [...state.users],
                isFetching: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default userReducer;