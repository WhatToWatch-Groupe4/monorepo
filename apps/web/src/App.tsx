import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import Login from './components/Login';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Login />
          <div className="text-xl font-semibold text-gray-500">
            test tailwind
          </div>
        </header>
      </div>
    </ReactKeycloakProvider>
  );
}

export default App;
