import React from 'react';

import './App.css';

import logo from './assets/logo.jpg';

import Routes from './routes';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="SPC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;