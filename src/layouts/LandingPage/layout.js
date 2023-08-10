import React, { useContext, useState, useEffect } from 'react';
import Header from 'src/components/topnav';
import Footer from 'src/components/Footer';
import Toc from 'src/components/sidenav';
import dynamic from 'next/dynamic';
import { Container, Grid, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppContext from 'src/contexts/ArenaContext';

import ArenaCards from 'src/pages/arenacard'; // Import the ArenaCard component

function MainLayout({ children }) {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { setArenaSessionId, setSelectedItem, setSelectedPage, selectedItem, selectedPage, externalUrl } = useContext(AppContext);
  const [isListNavOpen, setIsListNavOpen] = useState(true);

  
  const mainBodyContent = () => {
    // Check if the necessary context variables are set
    if (selectedPage==='arenalist') {
      return <ArenaCards />;
    }
  
    // You can return other content here if the condition is not met
    return <div>Please select an item from the sidebar</div>;
  };

  useEffect(() => {
    if (selectedPage === 'externalLink') setDynamicComponent(null);
    else if (selectedPage) {
      const DynamicComponent = dynamic(() => import(`src/pages/${selectedPage}`));
      setDynamicComponent(() => (props) => <DynamicComponent {...props} />);
    }
  }, [selectedPage, selectedItem]);

  const toggleListNav = () => setIsListNavOpen(!isListNavOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header toggleMenu={toggleSidebar} style={{ backgroundColor: 'mediumseagreen' }} />

      <Grid container style={{ flex: 1 }}>
        {showSidebar && (

          

<Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
             <Container style={{ padding: '16px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
  
                <Toc setSelectedPage={setSelectedPage} setSelectedItem={setSelectedItem} />

                </Container>
                <Divider orientation="vertical"  />
          </Grid>
         
        )}
        {isListNavOpen && (
          <Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
            <Container style={{ padding: '16px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              {DynamicComponent ? <DynamicComponent /> : children}
            </Container>
            <Divider orientation="vertical"  />
          </Grid>
        )}

<Grid item xs={8}>
  <Container style={{  padding: '16px', flex: 1, overflowY: 'auto' }}>
    {mainBodyContent()}
  </Container>
</Grid>
 



      </Grid>

      <Footer style={{ backgroundColor: 'dimgray', color: 'white', position: 'fixed', bottom: 0, left: 0, right: 0 }} />
    </div>
  );
}

export default MainLayout;