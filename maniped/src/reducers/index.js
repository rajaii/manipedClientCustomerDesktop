import { combineReducers } from "redux";

import loginReducer from './authReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    
});

export default rootReducer;