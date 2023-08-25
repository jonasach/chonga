import React, { useContext, useEffect} from 'react';
import TopNav from 'src/components/navigators/TopNav';
import SideNav from 'src/components/navigators/SideNav';
import ListNav from 'src/components/navigators/ListNav';
import MainBody from 'src/components/navigators/MainBody';
import Settings from 'src/components/navigators/Settings';


import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Toolbar from '@mui/material/Toolbar';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppContext from 'src/contexts/ArenaContext';

import useArenaQualityTemplates from 'src/hooks/useArenaQualityTemplates';



function MainLayout() {

  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const { showSideNav, setShowSideNav  } = useContext(AppContext);
  const { showListNav, setShowListNav } = useContext(AppContext);
  const { showMainBody, setShowMainBody  } = useContext(AppContext);
  
  useEffect(() => {
    if (isMdOrLess) {
      setShowListNav(false);
      setShowMainBody(false);
      setShowSideNav(true);
    } else {
      setShowListNav(true);
      setShowMainBody(true);
      setShowSideNav(true);
    }
  }, [isMdOrLess,setShowSideNav,setShowMainBody,setShowListNav]);

 useArenaQualityTemplates(); // This will run the logic to fetch and set the data
  
   return (

  <Grid container >

        <CssBaseline />
        <Grid item xs={12}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <TopNav />
          </AppBar>
        </Grid>


        <Grid item xs={isMdOrLess ? 12 : 1} md={2} style={{ display: showSideNav ? 'block' : 'none' }}>
          <Toolbar />
            <div><SideNav /></div>
        </Grid>
  
        <Divider orientation="vertical" />
  
    
          {!isMdOrLess || (isMdOrLess && showListNav) ? (
            <Grid item xs={isMdOrLess ? 12 : 1} md={2}>
              <Toolbar />
              <div><ListNav /></div>
            </Grid>
          ) : null}

        <Divider orientation="vertical" />

        {!isMdOrLess || (isMdOrLess && showMainBody) ? (
            <Grid item xs={isMdOrLess ? 12 : 1} md={7} style={{ height: '100%' }}>
                < Box sx={{ maxHeight: 'calc(100vh - 0px)', overflowY: 'auto' } }>
                  <Toolbar />
                  <MainBody />
                </Box>
            </Grid>
          ) : null}
      
          <Settings />

</Grid>
    );
}
export default MainLayout;
