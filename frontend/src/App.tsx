import React from 'react';
import logo from './logo.png';
import './App.css';
import OrgMatches from './components/OrgMatches';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <OrgMatches />
      </header>
    </div>
  );
}

export default App;
