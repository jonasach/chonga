import React, { useContext, useState, useEffect} from 'react';
import TopNav from 'src/components/TopNav';
import Footer from 'src/components/Footer';
import SideNav from 'src/components/SideNav';
import ListNav from 'src/components/ListNav';
import MainBody from 'src/components/MainBody';
import Settings from 'src/components/Settings';
import AppContext from 'src/contexts/ArenaContext';

import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Toolbar from '@mui/material/Toolbar';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function MainLayout() {


  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const { showListNav, setShowListNav } = useContext(AppContext);
  const { showMainBody, setShowMainBody  } = useContext(AppContext);
 
  
  useEffect(() => {
    // Set showListNav based on the value of isMdOrLess
    if (isMdOrLess) {
      setShowListNav(false);
      setShowMainBody(false);

    } else {
      setShowListNav(true);
      setShowMainBody(true);
    }
  }, [isMdOrLess]);



  const { 
    setArenaSessionId ,
    showSideNav, setShowSideNav,
    showSettingsNav, setShowSettingsNav,
    populateSideNav, setPopulateSideNav,
    populateListNav, setPopulateListNav,
    populateMainBody, setPopulateMainBody

  } = useContext(
    AppContext
  );

   return (


  <Grid container >

        <CssBaseline />
        <Grid item xs={12}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <TopNav />
          </AppBar>
        </Grid>

        <Grid item xs={1} md={2}>    
            <Toolbar />
            <SideNav />
        </Grid>

        <Divider orientation="vertical" />
  
    
          {!isMdOrLess || (isMdOrLess && showListNav) ? (
            <Grid item xs={isMdOrLess ? 12 : 1} md={2}>
              <Toolbar />
              {/* You can replace ListNav with your actual component */}
              <div><ListNav /></div>
            </Grid>
          ) : null}

          {/* Example toggle button; you can replace this with your own toggle logic */}
          {isMdOrLess && (
            <button onClick={() => setToggled(!showListNav)}>Toggle</button>
          )}
   

        <Divider orientation="vertical" />

        {!isMdOrLess || (isMdOrLess && showListNav) ? (
            <Grid item xs={isMdOrLess ? 12 : 1} md={2}>
                      < Box sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                          <Toolbar />
                        <MainBody />
                      </Box>
            </Grid>
          ) : null}

          <Settings />

          {/* Example toggle button; you can replace this with your own toggle logic */}
          {isMdOrLess && (
            <button onClick={() => setToggled(!showListNav)}>Toggle</button>
          )}

</Grid>
    );
}
export default MainLayout;
