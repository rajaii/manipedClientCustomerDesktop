import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { fetchAvailableServicesReducer } from './appReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer,
    fetchAvailableServicesReducer,
    
});

export default rootReducer;