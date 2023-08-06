import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toc from '../../components/Toc';
import dynamic from 'next/dynamic';
import { Container, Grid } from '@mui/material'; // Import Grid from Material-UI

function MainLayout({ children }) {
  const [selectedPage, setSelectedPage] = useState(null);
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // Added for sidebar toggle

  useEffect(() => {
    console.log('useEffect triggered, selectedPage:', selectedPage);

    if (selectedPage) {
      console.log('Loading component for selectedPage:', selectedPage);
      const DynamicComponent = dynamic(() => import(`../../pages/${selectedPage}`));
      setDynamicComponent(() => (props) => {
        console.log('Rendering component with props:', props);
        return <DynamicComponent selectedPage={selectedPage} {...props} />;
      });
    } else {
      console.log('No selectedPage, setting DynamicComponent to null');
      setDynamicComponent(null);
    }
  }, [selectedPage]);

  const toggleSidebar = () => { // Function to toggle the sidebar
    setShowSidebar(!showSidebar);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'mediumseagreen', position: 'sticky', top: 0, zIndex: 1 }}>
        <Header toggleMenu={toggleSidebar} /> {/* Updated prop name */}
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <Grid container style={{ flex: 1 }}>
          {showSidebar && (
            <Grid item xs={2} style={{ backgroundColor: 'mediumseagreen', color: 'white', height: '100%', position: 'sticky', top: 0 }}>
              <Toc setSelectedPage={setSelectedPage} />
            </Grid>
          )}
          <Grid item xs={showSidebar ? 10 : 12}>
            <Container style={{ padding: '16px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              {DynamicComponent ? <DynamicComponent selectedPage={selectedPage} /> : children}
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
