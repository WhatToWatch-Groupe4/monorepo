import { useKeycloak } from '@react-keycloak/web';

function Login() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    console.log({ user: keycloak.tokenParsed });

    return (
      <a className="App-link" href={keycloak.createLogoutUrl()}>
        Logout
      </a>
    );
  }

  return (
    <a className="App-link" href={keycloak.createLoginUrl()}>
      Login
    </a>
  );
}
export default Login;
