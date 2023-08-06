import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Toc from '../../components/Toc';
import dynamic from 'next/dynamic';
import { Container, Drawer } from '@mui/material';

function MainLayout({ children }) {
  const [selectedPage, setSelectedPage] = useState(null);
  const [DynamicComponent, setDynamicComponent] = useState(null);

  useEffect(() => {
    if (selectedPage) {
      const component = dynamic(() => import(`../../pages/${selectedPage}`));
      setDynamicComponent(component);
    } else {
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
        {DynamicComponent ? <DynamicComponent /> : children}
      </Container>
      <Footer />
    </div>
  );
}

export default MainLayout;
