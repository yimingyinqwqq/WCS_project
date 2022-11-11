import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter, Routes }from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Schedule from './components/Schedule'

import LoginPage from './components/LoginPage.tsx';
import AuthenticationPage from './components/pages/AuthenticationPage.tsx'
import RegisterPage from './components/pages/RegisterPage.tsx'
import NotFoundPage from './components/pages/NotFound.tsx'
import Classmate from './components/table/Classmate.js';
import CourseFinder from './components/CourseFinder';

import "./App.css"

class App extends Component {
  render() {
    return (
      <div className='background'>
      <BrowserRouter>
        <div className="App">
          <Navbar/>

          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>} />
            <Route path='/schedule' element={<Schedule/>} />
            <Route path='/courses' element={<CourseFinder/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/authentication' element={<AuthenticationPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route element={<NotFoundPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

