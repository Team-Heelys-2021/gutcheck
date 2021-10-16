import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';

function Layer() {
  const [colorTheme, setColorTheme] = React.useState('light');

  const toggleColorTheme = () => {
    if (colorTheme === 'light') {
      setColorTheme('dark');
    } else {
      setColorTheme('light');
    }
  } 

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
      mode: colorTheme
    },
  });

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App toggleColorTheme={toggleColorTheme}/>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}



ReactDOM.render(
  <Layer/>,
  document.getElementById('app')
);
