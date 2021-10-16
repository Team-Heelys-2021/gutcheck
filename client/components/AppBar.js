import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import WavesIcon from '@mui/icons-material/Waves';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BookIcon from '@mui/icons-material/Book';
import MapIcon from '@mui/icons-material/Map';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StripeButton from './StripeButton.js';
import Brightness4 from '@mui/icons-material/Brightness4';

import { useOktaAuth } from '@okta/okta-react';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import { useHistory } from 'react-router-dom';

export default function ButtonAppBar(props) {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => oktaAuth.signOut();
  const {toggleColorTheme} = props;

  let history = useHistory();
  const toDashboard = () => {
    history.replace('/dashboard');
  };

  const toHome = () => {
    history.replace('/');
  };

  const toGutcheck = () => {
    history.replace('/gutcheck');
  };

  const toMeditation = () => {
    history.replace('/meditation');
  };

  const toExercise = () => {
    history.replace('/exercise');
  };

  const toJournal = () => {
    history.replace('/journal');
  };

  return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button
            // size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ m1: 1 }}
          >
            <StripeButton/>
          </Button>
          <Button color="inherit" onClick={toggleColorTheme}>
            <Brightness4 sx={{ml: 1}}/>
          </Button>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: 'Shadows Into Light' }}>
            MeTime
          </Typography>
            <Button color="inherit" onClick={toGutcheck}>
              Gutcheck
              <FoodBankIcon sx={{ml: 1}} />
            </Button>
            <Button color="inherit" onClick={toMeditation}>
              Meditation
              <WavesIcon sx={{ml: 1}} />
            </Button>
            <Button color="inherit" onClick={toExercise}>
              Happy Places
              <MapIcon sx={{ml: 1}} />
            </Button>
            <Button color="inherit" onClick={toJournal}>
              Journal
              <BookIcon sx={{ml: 1}} />
            </Button>
          <Button color="inherit" onClick={logout}>
            Logout
            <LogoutIcon sx={{ ml: 1 }} />
          </Button>
        </Toolbar>
      </AppBar>
  );
}
