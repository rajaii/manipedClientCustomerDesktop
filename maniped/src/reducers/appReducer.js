import { FETCH_AVAILABLE_SERVICES_START, FETCH_AVAILABLE_SERVICES_SUCCESS, FETCH_AVAILABLE_SERVICES_FAILURE, FETCH_USER_INFO_START, 
FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE, FETCH_BOOKINGS_START, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, POST_BOOKINGS_START, 
POST_BOOKINGS_SUCCESS, POST_BOOKINGS_FAILURE } from '../actions/appActions.js';

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

const bookingsInitialState = {
    fetching: false,
    posting: false,
    bookings: null,
    newBooking: null,
    error: null,

}


export function availableServicesReducer(state=availableServicesInitialState, action) {
    
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

export function userInfoReducer(state=userInfoInitialState, action) {
    
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

export function bookingsReducer(state=bookingsInitialState, action) {
    
    switch(action.type) {
        case FETCH_BOOKINGS_START:
            return {
                ...state,
                fetching: true,

            }
        case FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload,
                fetching: false
            }
        case FETCH_BOOKINGS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case POST_BOOKINGS_START:
            return {
                ...state,
                posting: true
            }
        case POST_BOOKINGS_SUCCESS:
            return {
                ...state,
                newBooking: action.payload, //push this onto a congrats screen saying you have booked ...
                posting: false
            }
        case POST_BOOKINGS_FAILURE:
            return {
                ...state,
                posting: false,
                error: action.payload
            }
        default:
            return state
    }
    
}