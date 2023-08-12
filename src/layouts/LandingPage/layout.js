  import React, { useContext, useState, useEffect } from 'react';
  import TopNav from 'src/components/TopNav';
  import Footer from 'src/components/Footer';
  import SideNav from 'src/components/SideNav';
  import ListNav from 'src/components/ListNav';
  import MainBody from 'src/components/MainBody';

  import dynamic from 'next/dynamic';
  import { Hidden, Container, Grid, Divider, IconButton } from '@mui/material';
  import AppContext from 'src/contexts/ArenaContext';
  import ArenaFiles from 'src/pages/arenafiles'; 

  function MainLayout({ children }) {
    const [ DynamicComponent, setDynamicComponent] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const {selectedGUID, arenaEndPoint,  setSelectedItem, setSelectedPage, selectedItem, selectedPage, externalUrl } = useContext(AppContext);
    const [isListNavOpen, setIsListNavOpen] = useState(true);
    const [ListNavComponent, setListNavComponent] = useState(null);

    // Define possible views
    const VIEWS = { SIDENAV: 'sidenav', LISTNAV: 'listnav', MAINBODY: 'mainbody' };
    // Set initial view to sidenav for mobile devices
    const [activeView, setActiveView] = useState(VIEWS.SIDENAV);

    const handleBackArrowClick = () => {
      console.log('Back arrow clicked'); // Debugging line
      switch (activeView) {
        case VIEWS.MAINBODY:
          setActiveView(VIEWS.LISTNAV);
          break;
        case VIEWS.LISTNAV:
          setActiveView(VIEWS.SIDENAV);
          break;
        // Other cases if necessary
      }
    };

    const mainBodyContent = () => {
      // Check if the necessary context variables are set
      console.log('layout.useEffect.mainBodyContent', selectedPage)
      if (selectedPage==='arenalist') {
        return <ArenaFiles />;
      }
      return <div></div>;
    };

    useEffect(() => {
      if (selectedPage) {
        const ListNavComponentImport = dynamic(() => import(`src/pages/${selectedPage}`));
        setListNavComponent(() => (props) => <ListNavComponentImport {...props} />);
      }
    }, [selectedPage]);


    return (    
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav onBackArrowClick={handleBackArrowClick} activeView={activeView} />
        {activeView === VIEWS.SIDENAV && <SideNav onSelect={() => setActiveView(VIEWS.LISTNAV)} />}
        {activeView === VIEWS.LISTNAV && <ListNav onSelect={() => setActiveView(VIEWS.MAINBODY)} />}
        {activeView === VIEWS.MAINBODY && (arenaEndPoint === 'files?format=pdf' ? <ArenaFiles /> : <MainBody />)}


        <Footer /> 
      </div>
    );
  }

  export default MainLayout;