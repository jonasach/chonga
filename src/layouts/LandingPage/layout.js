import React, { useContext, useState, useEffect } from 'react';
import Header from 'src/components/topnav';
import Footer from 'src/components/Footer';
import Toc from 'src/components/sidenav';
import dynamic from 'next/dynamic';
import { Hidden, Container, Grid, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppContext from 'src/contexts/ArenaContext';
import ArenaCards from 'src/pages/arenacard'; 
import ArenaFiles from 'src/pages/arenafiles'; 

function MainLayout({ children }) {
  const [ DynamicComponent, setDynamicComponent] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const {selectedGUID, arenaEndPoint,  setSelectedItem, setSelectedPage, selectedItem, selectedPage, externalUrl } = useContext(AppContext);
  const [isListNavOpen, setIsListNavOpen] = useState(true);
  const [ListNavComponent, setListNavComponent] = useState(null);

  const mainBodyContent = () => {
    // Check if the necessary context variables are set
    console.log('layout.useEffect.mainBodyContent', selectedPage)
    if (selectedPage==='arenalist') {
      return <ArenaFiles />;
    }
    return <div>Please select an item from the sidebar</div>;
  };


  useEffect(() => {
    if (selectedPage) {
      const ListNavComponentImport = dynamic(() => import(`src/pages/${selectedPage}`));
      setListNavComponent(() => (props) => <ListNavComponentImport {...props} />);
    }
  }, [selectedPage]);


    // DynamicComponent population
    useEffect(() => {
      console.log('layout.useEffect.selectedGUID', selectedGUID)
      if (arenaEndPoint === 'files' && selectedGUID) {
        console.log('layout.useEffect.arenaEndPoint', arenaEndPoint)
        //setDynamicComponent(() => ArenaFiles);
        //setDynamicComponent(() => <ArenaFiles />);
        //setDynamicComponent(ArenaFiles);
      }
      // Add other conditions for setting DynamicComponent here if necessary
    }, [selectedGUID, arenaEndPoint]); 

  /*
  useEffect(() => {
    if (selectedPage === 'externalLink') {
      setDynamicComponent(null);
    } else if (arenaEndPoint === 'files' && selectedGUID) {
      setDynamicComponent(() => <ArenaFiles />);
    } else if (selectedPage) {
      const DynamicComponentImport = dynamic(() => import(`src/pages/${selectedPage}`));
      setDynamicComponent(() => (props) => <DynamicComponentImport {...props} />);
    }
  }, [selectedPage, selectedGUID, arenaEndPoint]);
*/

  const toggleListNav = () => setIsListNavOpen(!isListNavOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    <Header toggleMenu={toggleSidebar} style={{ backgroundColor: 'mediumseagreen' }} />

    <Grid container style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'hidden' }}>
 

        {showSidebar && (
          <Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
            <Container style={{ padding: '0px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              <Toc setSelectedPage={setSelectedPage} setSelectedItem={setSelectedItem} />
            </Container>
            <Divider orientation="vertical"  />
          </Grid>
         
        )}

    
        {isListNavOpen && (
          <Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
            <Container style={{ padding: '0px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              {ListNavComponent ? <ListNavComponent /> : children}
            </Container>
            <Divider orientation="vertical"  />
          </Grid>
        )}



        <Hidden only={['sm', 'md', 'lg']}>
          <Grid item xs={8} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <Container style={{ backgroundColor: '#f0f0f0', padding: '0px' }}>
              {mainBodyContent()}
            </Container>
            <Divider orientation="vertical"  />
          </Grid>
        </Hidden>


      </Grid>

      <Footer style={{ backgroundColor: 'dimgray', color: 'white', position: 'fixed', bottom: 0, left: 0, right: 0 }} />
  
    </div>
  );
}

export default MainLayout;