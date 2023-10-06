import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField'; // <-- Import the TextField component

function Settings() {


  const {
    selectedGUID,selectedItem,
    arenaSessionId, setArenaSessionId,
    showSideNav, setShowSideNav,
    showListNav, setShowListNav,
    showMainBody, setShowMainBody,
    showSettingsNav, setShowSettingsNav, 
    externalURL, setExternalURL, 
    searchParams, setSearchParams,
    qualityProcessTemplates,
    isXS, isSM, isMD, isLG, isXL,selectedItemWorld,qualityProcessStepAttributes,
  } = useContext(AppContext);

  const [state, setState] = React.useState({ right: false });



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

   // Toggle showSettingsNav when the drawer is opened or closed
   const toggleSettingsNav = () => {
    setShowSettingsNav(!showSettingsNav);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >< Toolbar />    <Grid item xs={12}></Grid>
      <List>
        {/* Visibility Controls */}
        <ListItem>
          <FormControlLabel
            control={<Switch checked={showSideNav} onChange={() => setShowSideNav(!showSideNav)} />}
            label="Show Side Nav"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={showListNav} onChange={() => setShowListNav(!showListNav)} />}
            label="Show List Nav"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={showMainBody} onChange={() => setShowMainBody(!showMainBody)} />}
            label="Show Main Body"
          />
        </ListItem>
        {/* Loading Controls */}
      </List>
      <Divider />
      <List>
        {/* Read-Only Fields */}

        <ListItem><ListItemText primary={`Selected Item: ${selectedItem}`} /></ListItem>
        <ListItem><ListItemText primary={`Output Page: ${selectedItemWorld?.outputPage}`} /></ListItem>
        <ListItem><ListItemText primary={`API End Point: ${selectedItemWorld?.arenaEndPoint}`} /></ListItem>
        <ListItem><ListItemText primary={`Search End Point: ${selectedItemWorld?.arenaSearchEndPoint}`} /></ListItem>
        <ListItem><ListItemText primary={`ListNav Name: ${selectedItemWorld?.arenaListName}`} /></ListItem>
        <ListItem><ListItemText primary={`ListNav Number: ${selectedItemWorld?.arenaListNumber}`} /></ListItem>
        
        <ListItem>
        <ListItemText primary="External URL:" />
        <TextField
          value={externalURL}
          onChange={(e) => setExternalURL(e.target.value)}
          variant="outlined"
          fullWidth
          readOnly={externalURL ? true : false}  
        />
        </ListItem>

        <ListItem>
        <ListItemText primary="Search Criterial:" />
        <TextField
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          variant="outlined"
          fullWidth
          readOnly={searchParams ? true : false}  
        />
        </ListItem>


        <ListItem>
        <ListItemText primary="Arena Session ID:" />
        <TextField
          value={arenaSessionId}
          onChange={(e) => setArenaSessionId(e.target.value)}
          variant="outlined"
          fullWidth
          readOnly={arenaSessionId ? true : false}  
        />
        </ListItem>
            
        <ListItem><ListItemText primary={`Selected GUID: ${selectedGUID}`} /></ListItem>
        <ListItem><ListItemText primary={`isXS: ${isXS}`} /></ListItem>
        <ListItem><ListItemText primary={`isSM: ${isSM}`} /></ListItem>
        <ListItem><ListItemText primary={`isMD: ${isMD}`} /></ListItem>
        <ListItem><ListItemText primary={`isLG: ${isLG}`} /></ListItem>
        <ListItem><ListItemText primary={`isXL: ${isXL}`} /></ListItem>
        <ListItem><ListItemText primary={`quality templates: ${qualityProcessTemplates}`} /></ListItem>
        <ListItem><ListItemText primary={`quality attributes: ${qualityProcessStepAttributes}`} /></ListItem>

      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor='right'
        open={showSettingsNav}
        onClose={toggleSettingsNav} 
      >
        {list('right')}
      </Drawer>
    </div>
  );
}

export default Settings;
