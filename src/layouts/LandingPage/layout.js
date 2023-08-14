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
import { Container, Grid, Divider } from '@mui/material';
import useSession from 'src/hooks/useSession';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import isSameMinute from 'date-fns/fp/isSameMinute';

function MainLayout() {
  const {
    arenaEndPoint,
    populateListNav,
    populateMainBody,
    populateSideNav,
    selectedPage,
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

  const theme = useTheme();

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {renderTopNav()}

      <Grid container style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }}>
        {showSideNav && (
          <Grid id="SideNav" style={gridStyle}>
            <div style={{ height: '100%', backgroundColor: 'black', flex: 1, overflowY: 'auto' }}>
              {populateSideNav && <SideNav />}
            </div>
            <Divider orientation="vertical" />
          </Grid>
        )}
        {showListNav && (
          <Grid id="ListNav" style={gridStyle}>
            <div style={{ height: '100%', backgroundColor: 'black', flex: 1, overflowY: 'auto' }}>
              {populateListNav && <ListNav />}
            </div>
            <Divider orientation="vertical" />
          </Grid>
        )}
        {showMainBody && (
          <Grid
            id="MainBody"
            item
            xs={showSideNav && showListNav ? 8 : 12}
            style={{ backgroundColor: 'black', overflowY: 'auto' }}
          >
            <div style={{ height: '100%', backgroundColor: 'black', flex: 1, overflowY: 'hidden' }}>
              {populateMainBody && (arenaEndPoint === 'files?format=pdf' ? <ArenaFiles /> : <MainBody />)}
            </div>
            <Divider orientation="vertical" />
          </Grid>
        )}
      </Grid>
      <Footer />
      <Settings />
    </div>
  );
}

export default MainLayout;
