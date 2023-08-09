import React, { useContext, useState, useEffect } from 'react';
import Header from 'src/components/topnav';
import Footer from 'src/components/Footer';
import Toc from 'src/components/sidenav';
import dynamic from 'next/dynamic';
import { Container, Grid } from '@mui/material';
import AppContext from 'src/contexts/ArenaContext';


function MainLayout({ children}) {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { setArenaSessionId, setSelectedItem, setSelectedPage, selectedItem, selectedPage } = useContext(AppContext);
  

  useEffect(() => {
    console.log("layout.selectedPage",selectedPage)
     if (selectedPage) {
        const DynamicComponent = dynamic(() => import(`../../pages/${selectedPage}`));
        setDynamicComponent(() => (props) => {
          return <DynamicComponent {...props} />;
      });
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
