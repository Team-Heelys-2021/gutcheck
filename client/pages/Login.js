import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import Auth from '../pages/Auth';

const Login = ({ config }) => {
  const { authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <Auth />
  );
};
export default Login;
