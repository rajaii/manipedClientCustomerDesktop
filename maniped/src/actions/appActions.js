import axios from 'axios';

export const FETCH_AVAILABLE_SERVICES_START = 'FETCH_AVAILABLE_SERVICES_START';
export const FETCH_AVAILABLE_SERVICES_SUCCESS = 'FETCH_AVAILABLE_SERVICES_SUCCESS';
export const FETCH_AVAILABLE_SERVICES_FAILURE = 'FETCH_AVAILABLE_SERVICES_FAILURE';

export const fetchAvailableServices = creds => dispatch => {
    dispatch({type: FETCH_AVAILABLE_SERVICES_START});
    return axios.get('http://localhost:4000/api/available_services')
    .then(res => {
        dispatch({type: FETCH_AVAILABLE_SERVICES_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_AVAILABLE_SERVICES_FAILURE, payload: err.response}))

}