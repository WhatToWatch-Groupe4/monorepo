import { useKeycloak } from '@react-keycloak/web';
import { FunctionComponent } from 'react';

const Login: FunctionComponent = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    return (
      <a id="logout-btn" className="App-link text-white" href={keycloak.createLogoutUrl()}>
        Logout
      </a>
    );
  }

  return (
    <div id="login-btn">
      <a
        className="App-link border border-primary bg-primary text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline"
        href={keycloak.createLoginUrl()}
      >
        Sign In
      </a>
    </div>
  );
};

export default Login;
