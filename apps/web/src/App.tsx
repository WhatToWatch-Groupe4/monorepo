import React from 'react';
import './App.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieShow from './components/MovieShow';
import ViewList from './components/ViewList';
import WishButton from './components/WishButton';
import SideMenu from './components/SideMenu';
import TopMenu from './components/TopMenu';

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error);
};

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens);
};

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger} onTokens={tokenLogger}>
      <Router>
        <div className="App">
          <SideMenu />
          <div id="Main-layout" className="ml-32">
            <TopMenu />
          </div>
          <div className="container mx-auto">
            <Switch>
              <Route path="/movies/:id">
                <MovieShow />
              </Route>
              <Route path="/viewlist">
                <ViewList />
              </Route>
              <Route path="/wishlist">{/* <WishList /> */}</Route>
              <Route path="/">
                <MovieList />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
