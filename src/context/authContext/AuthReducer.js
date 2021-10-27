import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_START, LOGOUT_SUCCESS } from "../../constants/authConstants";


const authReducer = (state, action) => {
    switch (action.type) {

        // LOGIN
        case LOGIN_START:
            return {
                admin: {},
                isFetching: true,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                admin: action.payload,
                isFetching: false,
                error: null
            }
        case LOGIN_FAILED:
            return {
                admin: {},
                isFetching: false,
                error: action.payload
            }

        // LOGOUT
        case LOGOUT_START:
            return {
                admin: state.admin,
                isFetching: true,
                error: null
            }
        case LOGOUT_SUCCESS:
            return {
                admin: {},
                isFetching: false,
                error: null
            }
        case LOGOUT_FAILED:
            return {
                admin: state.admin,
                isFetching: false,
                error: action.payload
            }


        default:
            return state;
    }
};

export default authReducer;