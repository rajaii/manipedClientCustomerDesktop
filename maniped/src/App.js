import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav.js';
import HomePage from './components/HomePage.js';
import About from './components/About.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import ForgotUsername from './components/ForgotUsername.js';
import ForgotPassword from './components/ForgotPassword.js';
import DashBoard from './components/Dashboard/DashBoard.js';
import BookNow from './components/BookNow.js';
import ProviderSearch from './components/ProviderSearch.js';
import PrivateRoute from './components/PrivateRoute.js';
import CardSetupForm from './components/Payments/CardSetupForm.js';
import './App.css';

class App extends React.Component {
  
 render() {
   return (
     <div>
        
            <Nav />
            <Route exact path='/' render={(props) => <HomePage {...props} />} ></Route>
            <Route exact path='/about' render={(props) => <About {...props} />}></Route>
            <Route exact path='/register' render={(props) => <Register {...props} />}></Route>
            <Route exact path='/login' render={(props) => <Login {...props} />}></Route>
            <Route exact path='/forgotusername' render={(props) => <ForgotUsername {...props} />}></Route>
            <Route exact path='/forgotpassword' render={(props) => <ForgotPassword {...props} />}></Route>
            <Route exact path='/dashboard' render={(props) => <DashBoard {...props} />} ></Route>
            <Route exact path='/booknow' render={(props) => <BookNow {...props} />}></Route>
            <Route exact path='/providersearch' render={(props) => <ProviderSearch {...props} />}></Route>
            <Route exact path='/cardsetupform' render={(props) => <CardSetupForm {...props} />}></Route>
            
      
      </div>
   )
 }

      
 
}

export default App;
