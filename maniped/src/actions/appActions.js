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
    return axiosWithAuth().get('http://localhost:4000/api/users')
    .then(res => {
        dispatch({type: FETCH_USER_INFO_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_USER_INFO_FAILURE, payload: err.response}))

}

export const FETCH_BOOKINGS_START = 'FETCH_BOOKINGS_START';
export const FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKINGS_FAILURE = 'FETCH_BOOKINGS_FAILURE';

export const fetchBookings = (userId) => dispatch => {
    dispatch({type: FETCH_BOOKINGS_START});
    return axiosWithAuth().get(`http://localhost:4000/api/future_bookings/user/${userId}`)
    .then(res => {
        dispatch({type: FETCH_BOOKINGS_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_BOOKINGS_FAILURE, payload: err.response}))

}

export const POST_BOOKINGS_START = 'POST_BOOKINGS_START';
export const POST_BOOKINGS_SUCCESS = 'POST_BOOKINGS_SUCCESS';
export const POST_BOOKINGS_FAILURE = 'POST_BOOKINGS_FAILURE';

export const postBooking = booking => dispatch => {
    dispatch({type: POST_BOOKINGS_START});
    return axiosWithAuth().post('http://localhost:4000/api/future_bookings', booking)
    .then(res => {
        dispatch({type: POST_BOOKINGS_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: POST_BOOKINGS_FAILURE, payload: err.response}))

}

export const FETCH_PROVIDERS_INFO_START = 'FETCH_PROVIDERS_INFO_START';
export const FETCH_PROVIDERS_INFO_SUCCESS = 'FETCH_PROVIDERS_INFO_SUCCESS';
export const FETCH_PROVIDERS_INFO_FAILURE = 'FETCH_PROVIDERS_INFO_FAILURE';

export const fetchProvidersInfo = () => dispatch => {
    dispatch({type: FETCH_PROVIDERS_INFO_START});
    return axiosWithAuth().get('http://localhost:4000/api/providers')
    .then(res => {
        dispatch({type: FETCH_PROVIDERS_INFO_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_PROVIDERS_INFO_FAILURE, payload: err.response}))

}

export const FETCH_PROVIDER_INFO_START = 'FETCH_PROVIDER_INFO_START';
export const FETCH_PROVIDER_INFO_SUCCESS = 'FETCH_PROVIDER_INFO_SUCCESS';
export const FETCH_PROVIDER_INFO_FAILURE = 'FETCH_PROVIDER_INFO_FAILURE';

export const fetchProviderInfo = (id) => dispatch => {
    dispatch({type: FETCH_PROVIDER_INFO_START});
    return axiosWithAuth().get(`http://localhost:4000/api/providers/${id}`)
    .then(res => {
        dispatch({type: FETCH_PROVIDER_INFO_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_PROVIDER_INFO_FAILURE, payload: err.response}))

}

export const FETCH_LOCAL_PROVIDERS_START = 'FETCH_LOCAL_PROVIDERS_START';
export const FETCH_LOCAL_PROVIDERS_SUCCESS = 'FETCH_LOCAL_PROVIDERS_SUCCESS';
export const FETCH_LOCAL_PROVIDERS_FAILURE = 'FETCH_LOCAL_PROVIDERS_FAILURE';

export const fetchLocalProviders = (body) => dispatch => {
    dispatch({type: FETCH_LOCAL_PROVIDERS_START});
    return axiosWithAuth().post(`http://localhost:4000/api/nearby`, body)
    .then(res => {
        dispatch({type: FETCH_LOCAL_PROVIDERS_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_LOCAL_PROVIDERS_FAILURE, payload: err.response}))

}

export const FETCH_USERS_INFO_START = 'FETCH_USERS_INFO_START';
export const FETCH_USERS_INFO_SUCCESS = 'FETCH_USERS_INFO_SUCCESS';
export const FETCH_USERS_INFO_FAILURE = 'FETCH_USERS_INFO_FAILURE';

export const fetchUsersInfo = (id) => dispatch => {
    console.log(id)
    dispatch({type: FETCH_USERS_INFO_START});
    return axiosWithAuth().get(`http://localhost:4000/api/users/${id}`)
    .then(res => {
        dispatch({type: FETCH_USERS_INFO_SUCCESS, payload: res.data})
    })
    .catch(err => dispatch({type: FETCH_USERS_INFO_FAILURE, payload: err.response}))

}

