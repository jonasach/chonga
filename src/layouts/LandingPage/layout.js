import React, { useContext, useState, useEffect} from 'react';
import TopNav from 'src/components/TopNav';
import Footer from 'src/components/Footer';
import SideNav from 'src/components/SideNav';
import ListNav from 'src/components/ListNav';
import MenuSideNav from 'src/components/MenuSideNav';
import MenuListNav from 'src/components/MenuListNav';
import MenuMainBodyNav from 'src/components/MenuMainBodyNav';
import MainBody from 'src/components/MainBody';
import Settings from 'src/components/Settings';
import AppContext from 'src/contexts/ArenaContext';

import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Toolbar from '@mui/material/Toolbar';


function MainLayout() {
  const {

  } = useContext(AppContext);


   return (


  <Grid container >

        <CssBaseline />
        <Grid item xs={12}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <TopNav />
          </AppBar>
        </Grid>

        <Grid item xs={12} md={2}>    
            <Toolbar />
            <SideNav />
        </Grid>

        <Divider orientation="vertical" />
  
        <Grid item xs={12} md={2}>   
          <Toolbar />
          <ListNav />
        </Grid>


        <Divider orientation="vertical" />

        <Grid item xs={12} md={7}>
        < Box sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <Toolbar />
            <MainBody />
          </Box>
          <Settings />
        </Grid>
</Grid>
    );
}
export default MainLayout;
