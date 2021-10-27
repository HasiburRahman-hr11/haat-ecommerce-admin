import {
    LOGIN_FAILED,
    LOGIN_START, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_START, LOGOUT_SUCCESS
} from '../../constants/authConstants';

export const loginStart = () =>({type:LOGIN_START});
export const loginSuccess = (data) =>({type:LOGIN_SUCCESS , payload:data});
export const loginFailed = (error) =>({type:LOGIN_FAILED , payload:error});


export const logoutStart = () =>({type:LOGOUT_START});
export const logoutSuccess = () =>({type:LOGOUT_SUCCESS});
export const logoutFailed = (error) =>({type:LOGOUT_FAILED , payload:error});
