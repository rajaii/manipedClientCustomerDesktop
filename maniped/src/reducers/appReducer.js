import { FETCH_AVAILABLE_SERVICES_START, FETCH_AVAILABLE_SERVICES_SUCCESS, FETCH_AVAILABLE_SERVICES_FAILURE, FETCH_USER_INFO_START, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from '../actions/appActions.js';

const availableServicesInitialState = {
    fetching: false,
    availableServices: null,
    error: null,
    
}

const userInfoInitialState = {
    fetching: false,
    userInfo: null,
    error: null,
    
}


export function fetchAvailableServicesReducer(state=availableServicesInitialState, action) {
    
    switch(action.type) {
        case FETCH_AVAILABLE_SERVICES_START:
            return {
                ...state,
                fetching: true,

            }
        case FETCH_AVAILABLE_SERVICES_SUCCESS:
            return {
                ...state,
                availableServices: action.payload,
                fetching: false
            }
        case FETCH_AVAILABLE_SERVICES_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state
    }
    
}

export function fetchUserInfoReducer(state=userInfoInitialState, action) {
    
    switch(action.type) {
        case FETCH_USER_INFO_START:
            return {
                ...state,
                fetching: true,

            }
        case FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                fetching: false
            }
        case FETCH_USER_INFO_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state
    }
    
}