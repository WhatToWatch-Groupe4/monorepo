import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import Login from './components/Login';
import SideMenu from "./components/SideMenu";
import TopMenu from "./components/TopMenu";

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens)
}

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}  onEvent={eventLogger} onTokens={tokenLogger}>
      <div className="App">
        <SideMenu/>
        <div className="Main-layout ml-32">
          <TopMenu/>
        </div>
      </div>
    </ReactKeycloakProvider>
  );
}

export default App;
