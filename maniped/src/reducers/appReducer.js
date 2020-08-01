import { FETCH_AVAILABLE_SERVICES_START, FETCH_AVAILABLE_SERVICES_SUCCESS, FETCH_AVAILABLE_SERVICES_FAILURE, FETCH_USER_INFO_START, 
FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE, FETCH_BOOKINGS_START, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, POST_BOOKINGS_START, 
POST_BOOKINGS_SUCCESS, POST_BOOKINGS_FAILURE, FETCH_PROVIDERS_INFO_START, FETCH_PROVIDERS_INFO_SUCCESS, FETCH_PROVIDERS_INFO_FAILURE, 
FETCH_PROVIDER_INFO_START, FETCH_PROVIDER_INFO_SUCCESS, FETCH_PROVIDER_INFO_FAILURE, FETCH_LOCAL_PROVIDERS_START, FETCH_LOCAL_PROVIDERS_SUCCESS, 
FETCH_LOCAL_PROVIDERS_FAILURE, FETCH_USERS_INFO_START, FETCH_USERS_INFO_SUCCESS, FETCH_USERS_INFO_FAILURE, FETCH_COMPLETEDSERVICES_START, 
FETCH_COMPLETEDSERVICES_SUCCESS, FETCH_COMPLETEDSERVICES_FAILURE, CLEAR_NEW_BOOKING } from '../actions/appActions.js';

const availableServicesInitialState = {
    fetching: false,
    availableServices: null,
    error: null,
    
}

const userInfoInitialState = {
    fetchingUserInfo: false,
    fetchingUsersInfo: false,
    userInfo: null,
    usersInfo: null,
    error: null,
    
}

const bookingsInitialState = {
    fetchingBookings: false,
    postingBooking: false,
    bookings: null,
    newBooking: null,
    newBookingDone: false,
    error: null,

}

const providerInitialState = {
    fetchingProviders: false,
    fetchingProvider: false,
    providers: null,
    provider: null,
    error: null
}

const localProviderInitialState = {
    fetchingLocalProviders: false,
    localProviders: null,
    error: null
}

const completedServicesInitialState = {
    fetchingCompletedServices: false,
    completedServices: null,
    error: null
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
                fetchingUserInfo: true,

            }
        case FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                fetchingUserInfo: false
            }
        case FETCH_USER_INFO_FAILURE:
            return {
                ...state,
                fetchingUserInfo: false,
                error: action.payload
            }
        case FETCH_USERS_INFO_START:
            return {
                ...state,
                fetchingUsersInfo: true,

            }
        case FETCH_USERS_INFO_SUCCESS:
            return {
                ...state,
                usersInfo: action.payload,
                fetchingUsersInfo: false
            }
        case FETCH_USERS_INFO_FAILURE:
            return {
                ...state,
                fetchingUsersInfo: false,
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
                fetchingBookings: true,

            }
        case FETCH_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: action.payload,
                fetchingBookings: false
            }
        case FETCH_BOOKINGS_FAILURE:
            return {
                ...state,
                fetchingBookings: false,
                error: action.payload
            }
        case POST_BOOKINGS_START:
            return {
                ...state,
                postingBooking: true
            }
        case POST_BOOKINGS_SUCCESS:
            return {
                ...state,
                newBooking: action.payload, //push this onto a congrats screen saying you have booked ...
                newBookingDone: true,
                postingBooking: false
            }
        case POST_BOOKINGS_FAILURE:
            return {
                ...state,
                postingBooking: false,
                error: action.payload
            }
        case CLEAR_NEW_BOOKING:
            return {
                ...state,
                newBookingDone: action.payload,
            }
        default:
            return state
    }
    
}


export function providerReducer(state=providerInitialState, action) {
    
    switch(action.type) {
        case FETCH_PROVIDERS_INFO_START:
            return {
                ...state,
                fetchingProviders: true,

            }
        case FETCH_PROVIDERS_INFO_SUCCESS:
            return {
                ...state,
                providers: action.payload,
                fetchingProviders: false
            }
        case FETCH_PROVIDERS_INFO_FAILURE:
            return {
                ...state,
                fetchingProviders: false,
                error: action.payload
            }
        case FETCH_PROVIDER_INFO_START:
            return {
                ...state,
                fetchingProvider: true,

            }
        case FETCH_PROVIDER_INFO_SUCCESS:
            return {
                ...state,
                provider: action.payload,
                fetchingProvider: false
            }
        case FETCH_PROVIDER_INFO_FAILURE:
            return {
                ...state,
                fetchingProvider: false,
                error: action.payload
            }
        default:
            return state
        }
    
}


export function localProviderReducer(state=localProviderInitialState, action) {
    
    switch(action.type) {
        case FETCH_LOCAL_PROVIDERS_START:
            return {
                ...state,
                fetchingLocalProviders: true,

            }
        case FETCH_LOCAL_PROVIDERS_SUCCESS:
            return {
                ...state,
                localProviders: action.payload,
                fetchingLocalProviders: false
            }
        case FETCH_LOCAL_PROVIDERS_FAILURE:
            return {
                ...state,
                fetchingLocalProviders: false,
                error: action.payload
            }
        default:
            return state
    }
    
}

export function completedServicesReducer(state=completedServicesInitialState, action) {
    
    switch(action.type) {
        case FETCH_COMPLETEDSERVICES_START:
            return {
                ...state,
                fetchingCompletedServices: true,

            }
        case FETCH_COMPLETEDSERVICES_SUCCESS:
            return {
                ...state,
                completedServices: action.payload,
                fetchingCompletedServices: false
            }
        case FETCH_COMPLETEDSERVICES_FAILURE:
            return {
                ...state,
                fetchingCompletedServices: false,
                error: action.payload
            }
        default:
            return state
    }
    
}