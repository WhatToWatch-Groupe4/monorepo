import Keycloak from 'keycloak-js';

const url = process.env.REACT_APP_KEYCLOAK_URL;
const realm = process.env.REACT_APP_KEYCLOAK_REALM;
const clientId = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;

if (!realm) {
  throw new Error('Realm must be set');
}

if (!clientId) {
  throw new Error('clientId must be set');
}

const keycloak = Keycloak({
  url,
  realm,
  clientId,
});

export default keycloak;
