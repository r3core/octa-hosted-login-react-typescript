import { OidcConfig } from "@okta/okta-react";

interface Config {
    oidc: OidcConfig
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
const ISSUER = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
const PORT = process.env.REACT_APP_PORT || 8080;

export const config: Config = {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: `http://localhost:${PORT}/implicit/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  }
};
