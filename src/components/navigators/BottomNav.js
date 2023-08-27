import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { AppBar, Toolbar, Grid, FormControlLabel, Switch } from '@mui/material';

function BottomNav() {
  const { showSideNav, setShowSideNav, showListNav, setShowListNav, showMainBody, setShowMainBody } = useContext(AppContext);

  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Switch checked={showSideNav} onChange={() => setShowSideNav(!showSideNav)} />}
              label="Menu"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Switch checked={showListNav} onChange={() => setShowListNav(!showListNav)} />}
              label="List"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={<Switch checked={showMainBody} onChange={() => setShowMainBody(!showMainBody)} />}
              label="Main"
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default BottomNav;
