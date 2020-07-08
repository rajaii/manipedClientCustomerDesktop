import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav.js';
import HomePage from './components/HomePage.js';
import About from './components/About.js';
import Services from './components/Services.js';
import Register from './components/Register.js';
import './App.css';

class App extends React.Component {
 render() {
   return (
     <div>
        <Nav/>
        <Route exact path='/' render={(props) => <HomePage {...props} />} ></Route>
        <Route exact path='/about' render={(props) => <About {...props} />}></Route>
        <Route exact path='/services' render={(props) => <Services {...props} />}></Route>
        <Route exact path='/register' render={(props) => <Register {...props} />}></Route>
        

       
    </div>
   )
 }

        // services, login, signup,
 
}

export default App;
