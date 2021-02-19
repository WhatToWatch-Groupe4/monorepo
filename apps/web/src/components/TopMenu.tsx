import user from '../assets/user.jpg';
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Login from './Login';

function TopMenu() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    console.log(keycloak.tokenParsed);
    return (
      <div className="w-full bg-black-13 fixed flex justify-between relative align-center">
        <div></div>
        <div className="flex py-6 items-center px-32">
          <img src={user} alt="logo" className="rounded-full w-16 mx-4" />
          <div className="text-left">
            <p className="text-white font-bold">FONTAINE Romain</p>
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
