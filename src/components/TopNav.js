import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuSideNav from 'src/components/MenuSideNav'; 
import MenuListNav from 'src/components/MenuListNav'; 
import MenuMainBodyNav from 'src/components/MenuMainBodyNav'; 
import AppContext from 'src/contexts/ArenaContext'; // Import the context
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function TopNav({ toggleMenu, toggleListNav, activeView, onBackArrowClick }) {
  const { showSettingsNav, setShowSettingsNav } = useContext(AppContext); // Get the setShowSettingsNav function from the context


  return (
    <AppBar position="static">
  <Toolbar
      sx={{ display: 'flex', justifyContent: 'space-between' }} // Using Flexbox to align items
    >

      <div style={{ width: '20%', textAlign: 'left' }}>
          <img className="responsive-image"
                  src="/assets/logos/ptc2.svg" alt="Your description" 
          />
      </div>

        {/* Add a switch to toggle showSettingsNav */}
  
        {/* Conditionally render MenuAcount based on activeView */}
        {activeView === 'sidenav' && <MenuSideNav />} 

        {/* Conditionally render MenuSearch based on activeView */}
        {activeView === 'listnav' && <MenuListNav toggleListNav={toggleListNav} onBackArrowClick={onBackArrowClick} />} 

        {/* Conditionally render MenuSearch based on activeView */}
        {activeView === 'mainbody' && <MenuMainBodyNav onBackArrowClick={onBackArrowClick} />} 

        <div>
        <ListItem>
          <FormControlLabel
             control={<Switch checked={showSettingsNav} onChange={() => setShowSettingsNav(!showSettingsNav)} />}
            label="Settings"
          />
        </ListItem>
        </div>

     
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
