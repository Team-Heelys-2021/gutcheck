import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      light: '#7864B9',
      main: '#624CAB',
      dark: '#513F8D',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#EBEFFF',
      main: '#C1CEFE',
      dark: '#99ADFF',
      contrastText: '#A0DDFF',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const oktaAuth = new OktaAuth({
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  redirectUri: `${window.location.origin}/login/callback`,
  clientId: process.env.OKTA_CLIENT_ID,
});

const restoreOriginalUri = async (oktaAuth, originalUri) => {
  // redirect with custom router
  router.replace({
    // TODO: This is talking about browser router
    path: toRelativeUrl(originalUri, baseUrl),
  });
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Container maxWidth="lg">
            <App />
          </Container>
        </Security>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
