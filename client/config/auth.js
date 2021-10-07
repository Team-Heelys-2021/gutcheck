const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: `https://${process.env.OKTA_ORG_URL}/oauth2/default`,
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
  baseUrl: `https://${process.env.OKTA_ORG_URL}`,
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  redirectUri: window.location.origin + '/login/callback',
  authParams: {
    // If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    // pkce: false
  },
  // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

export { oktaAuthConfig, oktaSignInConfig };
