import React, { useState,useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toc from '../../components/Toc';
import dynamic from 'next/dynamic';
import { Container, Drawer } from '@mui/material';


function MainLayout({ children }) {
  const [selectedPage, setSelectedPage] = useState(null);
  const [DynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered, selectedPage:', selectedPage); // Log the current value of selectedPage
  
    if (selectedPage) {
      console.log('Loading component for selectedPage:', selectedPage); // Log the page being loaded
      const DynamicComponent = dynamic(() => import(`../../pages/${selectedPage}`));
      setDynamicComponent(() => (props) => {
        console.log('Rendering component with props:', props); // Log the props being passed to the component
        return <DynamicComponent selectedPage={selectedPage} {...props} />;
      });
    } else {
      console.log('No selectedPage, setting DynamicComponent to null'); // Log when selectedPage is falsy
      setDynamicComponent(null);
    }
  }, [selectedPage]);
  
  return (
    <div>
      <Header />
      <Drawer variant="permanent" anchor="left">
        <Toc setSelectedPage={setSelectedPage} />
      </Drawer>
      <Container>
        {DynamicComponent ? <DynamicComponent selectedPage={selectedPage} /> : children}
      </Container>
      <Footer />
    </div>
  );
}

export default MainLayout;
