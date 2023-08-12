import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';


import MenuSideNav from 'src/components/MenuSideNav'; // Correct path
import MenuListNav from 'src/components/MenuListNav'; // Correct path
import MenuMainBodyNav from 'src/components/MenuMainBodyNav'; // Correct path

function TopNav({ toggleMenu, toggleListNav, activeView, onBackArrowClick }) {
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          sx={{ mr: 2 }}
          edge="start"
          color="inherit"
          onClick={toggleMenu}
        >
        <MenuIcon />
        </IconButton>

        {/* Conditionally render MenuAcount based on activeView */}
        {activeView === 'sidenav' && <MenuSideNav />} 

        {/* Conditionally render MenuSearch based on activeView */}
        {activeView === 'listnav' && <MenuListNav toggleListNav={toggleListNav} onBackArrowClick={onBackArrowClick} />} 

        {/* Conditionally render MenuSearch based on activeView */}
        {activeView === 'mainbody' && <MenuMainBodyNav onBackArrowClick={onBackArrowClick} />} 

     
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
