import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import EditNote from './components/EditNote'
import HomePage from './components/HomePage'
import Dashboard from './components/Dashboard'
import SoloNote from './components/SoloNote'
import NewNote from './components/NewNote'


import './App.css';

function App(props) {
  console.log(props)
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/notes' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='/edit' component={EditNote} />
        <Route path='/new' component={NewNote} />
        <Route path='/view' component={SoloNote} />
      </BrowserRouter>
    </div>
  );
}


export default App;
