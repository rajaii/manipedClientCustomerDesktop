import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { availableServicesReducer, userInfoReducer, providerReducer, localProviderReducer, bookingsReducer, completedServicesReducer } from './appReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer,
    availableServicesReducer,
    userInfoReducer,
    providerReducer,
    localProviderReducer,
    bookingsReducer,
    completedServicesReducer
});

export default rootReducer;