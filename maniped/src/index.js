import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import './index.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const stripePromise = loadStripe("pk_test_51HPaoQFSPGPUh8ixB4uWwv7sokfnQTRZ2bXeJhrtre0msDJOo1YpOYgtnT0U5D6q2SipDKOuVrP1PINLIBuYXKJj00pdiCiZpS");
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
        <Router>
          <App />
        </Router>
    </Elements>
  </Provider>, document.getElementById('root')
);


