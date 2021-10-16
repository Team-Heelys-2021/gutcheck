import * as React from 'react';
import Auth from './pages/Auth';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import './index.scss';
//import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import AppBar from './components/AppBar';
import Gutcheck from './pages/Gutcheck';
import Journal from './pages/Journal';
import Meditation from './pages/Meditation';
import Exercise from './pages/Exercise';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const styles = {
  paperContainer: {
    height: '100%',
    //width: "100",
    //height: 800,
    // backgroundImage: `url(${beachImg})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'cover',
    //width: `calc(100vw + 48px)`,
    // margin: -24,
    // padding: 24,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    // backgroundAttachment: "fixed",
    // height: "100%"
  },
};

function App(props) {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const {colorTheme, toggleColorTheme} = props;

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
            <AppBar toggleColorTheme={toggleColorTheme}/>
            <Gutcheck />
          </Route>
          <Route exact path="/gutcheck">
            <AppBar toggleColorTheme={toggleColorTheme}/>
            <Gutcheck />
          </Route>
          <Route exact path="/exercise">
            <AppBar toggleColorTheme={toggleColorTheme}/>
            <Exercise />
          </Route>
          <Route exact path="/journal">
            <AppBar toggleColorTheme={toggleColorTheme}/>
            <Journal colorTheme={colorTheme}/>
          </Route>
          <Route exact path="/meditation">
            <AppBar toggleColorTheme={toggleColorTheme}/>
            <Container>
              <Meditation />
            </Container>
          </Route>
        </Switch>
      </Security>
    </React.Fragment>
  );
}

export default withRouter(App);
