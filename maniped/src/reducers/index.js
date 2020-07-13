import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer
    
});

export default rootReducer;