import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions.js';

const initialState = {
        registering: false,
        loggingIn: false,
        isLoggedIn: false,
        error: null
    
}

function loginReducer(state=initialState, action) {
    
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,

            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loggingIn: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                error: action.payload
            }
        default:
            return state
    }
    
}

function regsiterReducer(state=initialState, action) {
    
    switch(action.type) {
        case REGISTER_START:
            return {
                ...state,
                registering: true,

            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registering: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                error: action.payload
            }
        default:
            return state
    }
    
}

export default loginReducer;