import React, { useContext } from 'react';
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
import ArenaFiles from 'src/pages/arenafiles';
import useSession from 'src/hooks/useSession';
import useMediaQuery from '@mui/material/useMediaQuery';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



function MainLayout() {
  const {
    arenaEndPoint,
    populateListNav,
    populateMainBody,
    populateSideNav,
    showSideNav,
    showListNav,
    showMainBody,
  } = useContext(AppContext);

  const arenaSessionId = useSession();

  const isXS = useMediaQuery('(max-width:600px)');
  const isSM = useMediaQuery('(min-width:601px) and (max-width:768px)');
  const isMD = useMediaQuery('(min-width:769px) and (max-width:992px)');
  const isLG = useMediaQuery('(min-width:993px) and (max-width:1200px)');
  const isXL = useMediaQuery('(min-width:1201px)');

  const navStyle = {
    width: '100%',
  };

  const gridStyle = {
    width: isXS ? '100%' : '300px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  };


  const renderTopNav = () => {
    if (isXS || isSM) {
      if (showSideNav) {
        return <MenuSideNav style={navStyle} />;
      } else if (showListNav) {
        return <MenuListNav />;
      } else if (showMainBody) {
        return <MenuMainBodyNav />;
      }
    } else {
      return <TopNav />;
    }
  };

  return (
    <Box>

        <Grid container>
          <Grid item>
            {/* Header Content goes here */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid xs={12} md={3} item>
            <SideNav />
            </Grid>
          <Grid xs={12} md={3} item>
            {populateListNav && <ListNav />}
          </Grid>
          <Grid xs={12} md={3} item>
            {/* Mainbody Content goes here */}
          </Grid>
      </Grid>
  
        <Grid container>
          <Grid item>
             <Footer />{/* Footer Content goes here */}
          </Grid>
        </Grid>
    </Box>
    )
  
}
export default MainLayout;
