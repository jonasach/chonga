import React, { useState } from 'react';
import MainLayout from '../layouts/LandingPage/layout';
import MainContent from '../components/MainContent';

function LandingPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <MainLayout 
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem} 
        selectedPage={selectedPage} 
        setSelectedPage={setSelectedPage}>
      <MainContent 
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem} 
        selectedPage={selectedPage} 
        setSelectedPage={setSelectedPage} 
        />
    </MainLayout>
  );
}

export default LandingPage;
