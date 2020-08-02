import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { availableServicesReducer, userInfoReducer, providerReducer, localProviderReducer, bookingsReducer, completedServicesReducer, 
    addressesReducer, settingsReducer } from './appReducer.js';


const rootReducer = combineReducers({
    loginReducer,
    regsiterReducer,
    availableServicesReducer,
    userInfoReducer,
    providerReducer,
    localProviderReducer,
    bookingsReducer,
    completedServicesReducer,
    settingsReducer,
    addressesReducer
});

export default rootReducer;