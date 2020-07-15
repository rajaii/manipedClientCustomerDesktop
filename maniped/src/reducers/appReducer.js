import { FETCH_AVAILABLE_SERVICES_START, FETCH_AVAILABLE_SERVICES_SUCCESS, FETCH_AVAILABLE_SERVICES_FAILURE } from '../actions/appActions.js';

const initialState = {
    fetching: false,
    availableServices: null,
    error: null
}


export function fetchAvailableServicesReducer(state=initialState, action) {
    
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