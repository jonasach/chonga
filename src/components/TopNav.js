import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuSideNav from 'src/components/MenuSideNav';
import MenuListNav from 'src/components/MenuListNav';
import MenuMainBodyNav from 'src/components/MenuMainBodyNav';
import AppContext from 'src/contexts/ArenaContext';
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button'; // Import Button from MUI



function TopNav({ toggleListNav, activeView, onBackArrowClick }) {
  const { showSettingsNav, setShowSettingsNav, setArenaSessionId } = useContext(
    AppContext
  );

  // Function to handle logout
  const handleLogout = () => {
    // Clear session-related data and redirect to login
    setArenaSessionId(''); // Clear session ID
    sessionStorage.removeItem('arenaSessionId'); // Clear session ID from sessionStorage
    // You can also clear any other user-related data if necessary

    // Redirect to the login page
    window.location.href = '/'; // Change this URL to your login page's URL
  }; 

  return (  
    
     <Toolbar>
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
            <MenuIcon />
          </IconButton>
      
      {/* Switch to control visibility of settings */}
      <ListItem>
        <FormControlLabel
          control={
            <Switch
              checked={showSettingsNav}
              onChange={() => setShowSettingsNav(!showSettingsNav)}
            />
          }
          label="Settings"
        />
      </ListItem>
  
      {/* Logout button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogout} // Call the logout function
      >
        Logout
      </Button>
          </Toolbar>
  );  
        }; 
export default TopNav;
