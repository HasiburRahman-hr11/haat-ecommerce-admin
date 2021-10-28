import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess } from './AuthActions'

export const login = async (dispatch, formData) => {
    dispatch(loginStart());
    try {
        const { data } = await axios.post('https://hidden-crag-34912.herokuapp.com/api/auth/signin', formData);
        dispatch(loginSuccess(data));
        localStorage.setItem('admin', JSON.stringify(data));
    } catch (error) {
        dispatch(loginFailed(error));
    }
}

export const logout = (dispatch ) => {
    dispatch(logoutStart());
    localStorage.removeItem('admin');
    dispatch(logoutSuccess());
}