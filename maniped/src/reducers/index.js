import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { fetchAvailableServicesReducer, fetchUserInfoReducer } from './appReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer,
    fetchAvailableServicesReducer,
    fetchUserInfoReducer
    
});

export default rootReducer;