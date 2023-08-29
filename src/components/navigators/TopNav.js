  import React, { useContext } from 'react';
  import Toolbar from '@mui/material/Toolbar';
  import ListItem from '@mui/material/ListItem';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import Switch from '@mui/material/Switch';
  import Avatar from '@mui/material/Avatar';
  import Button from '@mui/material/Button';
  import SettingsIcon from '@mui/icons-material/Settings';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import { useTheme } from '@mui/material/styles';
  import AppContext from 'src/contexts/ArenaContext';

  function TopNav() {
    const { 
      showSettingsNav, 
      setShowSettingsNav, 
      setShowSideNav,
      setShowMainBody,
      setShowListNav,
    
    } = useContext(
      AppContext
    );
    
      
  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));

  const handleHomeClick = () => {
    setShowSideNav(true);
    setShowListNav(false);
    setShowMainBody(false);
  };

    // Function to handle logout
    const handleLogout = () => {
      window.location.href = '/'; // Change this URL to your login page's URL
    }; 

    return (  
      
      <Toolbar>

<Avatar 
    alt="Joe Erickson" 
    src="/assets/images/avatar/1.jpg" 
    style={{backgroundColor: 'black'}}
/>


        {isMdOrLess && (
        <Button
            variant="outlined"
            color="primary"
            onClick={handleHomeClick}
            style={{ marginRight: '10px' }} 
        >
          Home
        </Button>
      )}

<ListItem>
  <FormControlLabel
    control={
      <Switch
        checked={showSettingsNav}
        onChange={() => setShowSettingsNav(!showSettingsNav)}
      />
    }
    label={<>
      <SettingsIcon />
      {!isMdOrLess && "Settings"}
    </>}
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
          } 
  export default TopNav;
