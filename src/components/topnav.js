import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function topnav({ toggleMenu }) {
  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5', height: '64px' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Arena RESTAPI Client
        </Typography>
        {/* Other header content */}
      </Toolbar>
    </AppBar>
  );
}

export default topnav;

