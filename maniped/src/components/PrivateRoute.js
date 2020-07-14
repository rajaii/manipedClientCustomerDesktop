import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...theRest}) => {
    return (
        <Route 
        {...theRest}
        render={() => {
            if (localStorage.getItem('token')) {
                return <Component />
            } else {
                console.log('redirect to login')
                return <Redirect to='/' />
            }
        }}
        />
    );
};

export default PrivateRoute;
