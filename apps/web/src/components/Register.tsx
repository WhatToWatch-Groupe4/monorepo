import { useKeycloak } from '@react-keycloak/web';

function Register() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    console.log({ user: keycloak.tokenParsed });

    return null;
  }

  return (
    <div>
      <a
        className="App-link border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        href={keycloak.createRegisterUrl()}
      >
        Sign Up
      </a>
    </div>
  );
}

export default Register;
