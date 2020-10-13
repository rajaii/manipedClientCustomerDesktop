import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT,
FORGOT_USERNAME_START, FORGOT_USERNAME_SUCCESS, FORGOT_USERNAME_FAILURE, FORGOT_PASSWORD_START, FORGOT_PASSWORD_SUCCESS, 
FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../actions/authActions.js';

const initialState = {
        successfulRegister: false,
        registering: false, 
        registerData: null,
        loggingIn: false,
        userId: null,
        welcomeMessage: '',
        isLoggedIn: false,
        sendingUsername: false,
        usernameSent: '',
        sendingpwlink: false,
        pwlinksent: '',
        
        resettingPassword: false,
        passwordReset: '',
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
                welcomeMessage: action.payload.message,
                userId: action.payload.id,
                loggingIn: false,

            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                error: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,

            }
        case FORGOT_USERNAME_START:
            return {
                ...state,
                sendingUsername: true,

            }
        case FORGOT_USERNAME_SUCCESS:
            return {
                ...state,
                sendingUsername: false,
                usernameSent: action.payload

            }
        case FORGOT_USERNAME_FAILURE:
            return {
                ...state,
                loggingIn: false,
                error: action.payload
            }
        case FORGOT_PASSWORD_START:
            return {
                ...state,
                sendingpwlink: true,

            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                sendingpwlink: false,
                pwlinksent: action.payload

            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                sendingpwlink: false,
                error: action.payload
            }
        case RESET_PASSWORD_START:
            return {
                ...state,
                resettingPassword: true,

            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resettingPassword: false,
                passwordReset: action.payload

            }
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                resettingPassword: false,
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

