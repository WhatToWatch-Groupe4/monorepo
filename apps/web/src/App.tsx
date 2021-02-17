import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import SideMenu from "./components/SideMenu";
import TopMenu from "./components/TopMenu";

function App() {
  return (
    <div className="App">
      <SideMenu/>
      <div className="Main-layout ml-32">
          <TopMenu/>
      </div>
    </div>
  );
}

export default App;
