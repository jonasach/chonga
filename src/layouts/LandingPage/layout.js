import React, { useState, useEffect } from 'react';
import Header from '../../components/topnav';
import Footer from '../../components/Footer';
import Toc from '../../components/sidenav';
import dynamic from 'next/dynamic';
import { Container, Grid } from '@mui/material';
import QualityDetail from '../../pages/qualitydetail'; // Import QualityDetail component

function MainLayout({ children, selectedItem, setSelectedItem, selectedPage, setSelectedPage }) {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (selectedItem) {
      // If an item is selected, show the Detail component for that item
      setDynamicComponent(() => (props) => {
        return <QualityDetail guid={selectedItem} goBack={() => setSelectedItem(null)} {...props} />;
      });
    } else if (selectedPage) {
      // If a page is selected, import and render the page component
      const DynamicComponent = dynamic(() => import(`../../pages/${selectedPage}`));
      setDynamicComponent(() => (props) => {
        return <DynamicComponent setSelectedItem={setSelectedItem} {...props} />;
      });
    } else {
      setDynamicComponent(null);
    }
  }, [selectedPage, selectedItem]);

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
          <Grid item xs={showSidebar ? 10 : 12}>
            <Container style={{ padding: '16px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              {DynamicComponent ? <DynamicComponent /> : children}
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
