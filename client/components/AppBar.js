import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/LogoutOutlined'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
      <AppBar position="static" sx={{ borderRadius: '3px' }} >
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
            Gutcheck
          </Typography>
          <Button color="inherit">Logout<LogoutIcon sx={{ ml: 1 }}/></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
