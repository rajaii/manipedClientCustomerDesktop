import { combineReducers } from "redux";

import { loginReducer, regsiterReducer } from './authReducer.js';
import { availableServicesReducer, userInfoReducer, providerReducer, localProviderReducer, bookingsReducer, completedServicesReducer, 
    addressesReducer, settingsReducer, userRatingsReducer } from './appReducer.js';


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
    addressesReducer,
    userRatingsReducer
});

export default rootReducer;