import React, { useContext, useState, useEffect } from 'react';
import Header from 'src/components/topnav';
import Footer from 'src/components/Footer';
import Toc from 'src/components/sidenav';
import dynamic from 'next/dynamic';
import { Container, Grid, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Replace with your preferred icon
import AppContext from 'src/contexts/ArenaContext';

function MainLayout({ children }) {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { setArenaSessionId, setSelectedItem, setSelectedPage, selectedItem, selectedPage } = useContext(AppContext);

  const [externalUrl, setExternalUrl] = useState(null);
  const [isListNavOpen, setIsListNavOpen] = useState(true);

  useEffect(() => {
    if (selectedPage === 'externalLink') {
      setExternalUrl('');
      setDynamicComponent(null);
      return;
    }

    if (selectedPage) {
      const DynamicComponent = dynamic(() => import(`../../pages/${selectedPage}`));
      setDynamicComponent(() => (props) => {
        return <DynamicComponent {...props} />;
      });
    }
  }, [selectedPage, selectedItem]);

  const toggleListNav = () => {
    setIsListNavOpen(!isListNavOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'mediumseagreen', position: 'sticky', top: 0, zIndex: 1 }}>
        <Header toggleMenu={toggleSidebar} />
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <Grid container style={{ flex: 1 }}>
          {showSidebar && (
            <Grid item xs={2} style={{ backgroundColor: 'mediumseagreen', color: 'white', height: '100%', position: 'sticky', top: 0 }}>
              <Toc setSelectedPage={setSelectedPage} setSelectedItem={setSelectedItem} />
            </Grid>
          )}
          {showSidebar && <Divider orientation="vertical" flexItem />}
          <Grid item xs={isListNavOpen ? 2 : 0} style={{ backgroundColor: 'white', overflowY: 'auto', transition: 'all 0.3s' }}>
            {externalUrl ? (
              <iframe src={externalUrl} style={{ width: '100%', height: '100%' }} />
            ) : DynamicComponent ? (
              <DynamicComponent />
            ) : (
              children
            )}
          </Grid>
          {isListNavOpen && <Divider orientation="vertical" flexItem />}
          <div
            style={{
              width: '48px', // Adjust to your desired width
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              position: 'sticky',
              top: '20px', // Adjust to your desired position
            }}
          >
            <IconButton onClick={toggleListNav}>
              <MenuIcon /> {/* Replace with your preferred icon */}
            </IconButton>
          </div>
          <Grid item xs={isListNavOpen ? 8 : 10}>
            <Container style={{ padding: '16px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              {/* Main Body - Empty for Now */}
            </Container>
          </Grid>
        </Grid>
      </div>
      <div style={{ backgroundColor: 'dimgray', color: 'white', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </div>
    </div>
  );
  
  
}

export default MainLayout;
