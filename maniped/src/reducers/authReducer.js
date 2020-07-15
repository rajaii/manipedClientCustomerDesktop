import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/authActions.js';

const initialState = {
        successfulRegister: false,
        registering: false, 
        registerData: null,
        loggingIn: false,
        welcomeMessage: '',
        isLoggedIn: false,
        error: null
    
}

export function loginReducer(state=initialState, action) {
    
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
                welcomeMessage: action.payload,
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

export function regsiterReducer(state=initialState, action) {
    
    switch(action.type) {
        case REGISTER_START:
            return {
                ...state,
                registering: true,

            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                successfulRegister: true,
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
