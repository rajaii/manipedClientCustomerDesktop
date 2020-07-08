import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav.js';
import HomePage from './components/HomePage.js';
import './App.css';

class App extends React.Component {
 render() {
   return (
     <div>
        <Nav/>
        <Route path='/' exact render={(props) => <HomePage {...props} />} ></Route>
        

       
    </div>
   )
 }

        // about, services, login, signup,
 
}

export default App;
