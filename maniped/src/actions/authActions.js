import axios from "axios";

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