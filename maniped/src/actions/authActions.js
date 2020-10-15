import axios from "axios";
import axiosWithAuth from './axiosWithAuth.js';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({type: LOGIN_START});
    return axios.post('http://localhost:4000/api/auth/login', creds)
    .then(res => {
        localStorage.setItem('token', res.data.jwt_token);
        localStorage.setItem('uID', res.data.id);
        localStorage.setItem('uName', res.data.name);
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
    })
    .catch(err => dispatch({type: LOGIN_FAILURE, payload: err.response}))

}

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const register = creds => dispatch => {
    dispatch({type: REGISTER_START});
    return axios.post('http://localhost:4000/api/auth/register', creds)
    .then(res => {
        dispatch({type: REGISTER_SUCCESS, payload: res})
    })
    .catch(err => dispatch({type: REGISTER_FAILURE, payload: err}))
}

export const LOGOUT = 'LOGOUT';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uID');
    return {
        type: LOGOUT,
        
    }
}

export const FORGOT_USERNAME_START = 'FORGOT_USERNAME_START';
export const FORGOT_USERNAME_SUCCESS = 'FORGOT_USERNAME_SUCCESS';
export const FORGOT_USERNAME_FAILURE = 'FORGOT_USERNAME_FAILURE';

export const sendUsername = email => dispatch => {
    dispatch({type: FORGOT_USERNAME_START});
    return axios.post('http://localhost:4000/api/auth/forgotusername', email)
    .then(res => {
        dispatch({type: FORGOT_USERNAME_SUCCESS, payload: res})
    })
    .catch(err => dispatch({type: FORGOT_USERNAME_FAILURE, payload: err}))
}

export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const resetPassword = email => dispatch => {
    dispatch({type: FORGOT_PASSWORD_START});
    return axios.post('http://localhost:4000/api/auth/forgotuserpassword', email)
    .then(res => {
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: res})
    })
    .catch(err => dispatch({type: FORGOT_PASSWORD_FAILURE, payload: err}))
}

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPasswordFin = (id, body) => dispatch => {
    dispatch({type: RESET_PASSWORD_START});
    return axiosWithAuth().put(`http://localhost:4000/api/users/${id}`, body)
    .then(res => {
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: res})
    })
    .catch(err => dispatch({type: RESET_PASSWORD_FAILURE, payload: err}))
}

export const RESEND_VERIFICATION_START = 'RESEND_VERIFICATION_START';
export const RESEND_VERIFICATION_SUCCESS = 'RESEND_VERIFICATION_SUCCESS';
export const RESEND_VERIFICATION_FAILURE = 'RESEND_VERIFICATION_FAILURE';

export const resendVerification = (body) => dispatch => {
    dispatch({type: RESEND_VERIFICATION_START});
    return axios.put(`http://localhost:4000/api/auth/resendverification`, body)
    .then(res => {
        dispatch({type: RESEND_VERIFICATION_SUCCESS, payload: res})
    })
    .catch(err => dispatch({type: RESEND_VERIFICATION_FAILURE, payload: err}))
}