import axios from 'axios';
import axiosWithAuth from './axiosWithAuth.js';

export const FETCH_AVAILABLE_SERVICES_START = 'FETCH_AVAILABLE_SERVICES_START';
export const FETCH_AVAILABLE_SERVICES_SUCCESS = 'FETCH_AVAILABLE_SERVICES_SUCCESS';
export const FETCH_AVAILABLE_SERVICES_FAILURE = 'FETCH_AVAILABLE_SERVICES_FAILURE';

export const fetchAvailableServices = () => dispatch => {
    dispatch({type: FETCH_AVAILABLE_SERVICES_START});
    return axios.get('http://localhost:4000/api/available_services')
    .then(res => {
        dispatch({type: FETCH_AVAILABLE_SERVICES_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_AVAILABLE_SERVICES_FAILURE, payload: err.response}))

}

export const FETCH_USER_INFO_START = 'FETCH_USER_INFO_START';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchUserInfo = () => dispatch => {
    dispatch({type: FETCH_USER_INFO_START});
    return axios.get('http://localhost:4000/api/users')
    .then(res => {
        dispatch({type: FETCH_USER_INFO_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_USER_INFO_FAILURE, payload: err.response}))

}