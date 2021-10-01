import * as React from 'react';
import Auth from './pages/Auth';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Dashboard from './pages/Dashboard';

import './index.scss';
import Home from './pages/Home';

function App() {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    redirectUri: `${window.location.origin}/login/callback`,
    clientId: process.env.OKTA_CLIENT_ID,
    onAuthRequired: onAuthRequired,
    pkce: true,
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    // originalUri value is null and was throwing error.
    // Probably supposed to be the originating location that you weren't authorized to access
    // and resulted in a redirect to /login. When authed, it should take you back...
    history.replace('/');
  };

  return (
    <React.Fragment>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Security>
    </React.Fragment>
  );
}

export default withRouter(App);
