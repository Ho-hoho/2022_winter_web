import React from 'react';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import  Auth  from './hoc/auth'

function App() {
  const NewLandingPage = Auth(LandingPage,null);
  const NewLoginPage = Auth(LoginPage,false);
  const NewRegisterPage = Auth(RegisterPage,false);

  return(
    <Router>
      <div>
        {

        }
        <Routes>
          <Route exact path="/" element = {<NewLandingPage/>} />
          <Route exact path="/login" element = {<NewLoginPage/>} />
          <Route exact path="/register" element = {<NewRegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
