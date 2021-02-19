import { useKeycloak } from '@react-keycloak/web';

function Register() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated) {
    return null;
  }

  return (
    <div>
      <a
        className="App-link border border-primary bg-primary text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline"
        href={keycloak.createRegisterUrl()}
      >
        Sign Up
      </a>
    </div>
  );
}

export default Register;
