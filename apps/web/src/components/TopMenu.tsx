import user from '../assets/user.jpg';
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Login from './Login';
import { KeycloakResourceAccess, KeycloakRoles } from 'keycloak-js';

interface TokenParsed {
  exp?: number;
  iat?: number;
  nonce?: string;
  sub?: string;
  session_state?: string;
  realm_access?: KeycloakRoles;
  resource_access?: KeycloakResourceAccess;
  preferred_username: string;
}

function TopMenu() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    const token = keycloak.tokenParsed as TokenParsed;
    return (
      <div className="w-full bg-black-13 fixed flex justify-between relative align-center">
        <div></div>
        <div className="flex py-6 items-center px-32">
          <img src={user} alt="logo" className="rounded-full w-16 mx-4" />
          <div className="text-left">
            <p className="text-white font-bold">{token.preferred_username}</p>
            <p className="px-8 rounded-xl text-white uppercase font-bold inline-block text-sm bg-gradient-to-r from-primary to-secondary">
              admin
            </p>
            <Login />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black-13 fixed flex justify-between relative align-center min-h-112">
      <Login />
    </div>
  );
}

export default TopMenu;
