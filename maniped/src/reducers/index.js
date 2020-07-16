import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { availableServicesReducer, userInfoReducer } from './appReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer,
    availableServicesReducer,
    userInfoReducer
    
});

export default rootReducer;