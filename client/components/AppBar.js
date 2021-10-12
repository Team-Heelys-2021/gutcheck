import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { useOktaAuth } from '@okta/okta-react';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import { useHistory } from 'react-router-dom';

export default function ButtonAppBar() {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => oktaAuth.signOut();

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
    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
      <AppBar position="static" sx={{ borderRadius: '3px' }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={toGutcheck}>
              Gutcheck
            </Button>
            <Button color="inherit" onClick={toMeditation}>
              Meditation
            </Button>
            <Button color="inherit" onClick={toExercise}>
              Exercise
            </Button>
            <Button color="inherit" onClick={toJournal}>
              Journal
            </Button>
          </Typography>
          <Button color="inherit" onClick={toDashboard}>
            Dashboard
            <DashboardIcon sx={{ ml: 1 }} />
          </Button>
          <Button color="inherit" onClick={logout}>
            Logout
            <LogoutIcon sx={{ ml: 1 }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
