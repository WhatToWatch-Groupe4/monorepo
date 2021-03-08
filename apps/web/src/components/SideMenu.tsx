import logo from '../assets/logo.svg';
import clapperboard from '../assets/icons/clapperboard.png';
import clock from '../assets/icons/clock.png';
import binoculars from '../assets/icons/binoculars.png';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const SideMenu: FunctionComponent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }
  if (keycloak.authenticated) {
    return (
      <div className="w-32 bg-black-20 h-screen fixed">
        <Link to={''}>
          <img src={logo} alt="logo" className="p-6" />
        </Link>
        <div className="h-0.5 bg-white opacity-40 w-16 m-auto my-4" />
        <div className="menu">
          <Link to={''}>
            <img
              src={clapperboard}
              alt="logo"
              className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer"
            />
          </Link>
          <Link to={'/wishlist'}>
            <img src={clock} alt="logo" className="m-auto px-10 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
          </Link>
          <Link to={'/viewlist'}>
            <img
              src={binoculars}
              alt="logo"
              className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-32 bg-black-20 h-screen fixed">
        <Link to={''}>
          <img src={logo} alt="logo" className="p-6" />
        </Link>
        <div className="h-0.5 bg-white opacity-40 w-16 m-auto my-4" />
        <div className="menu">
          <Link to={''}>
            <img
              src={clapperboard}
              alt="logo"
              className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer"
            />
          </Link>
          <img src={clock} alt="logo" className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
          <img src={binoculars} alt="logo" className="m-auto px-11 py-6 opacity-50 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
    );
  }
};

export default SideMenu;
