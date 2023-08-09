import React, { useState } from 'react';
import MainLayout from 'src/layouts/LandingPage/layout';
import MainContent from 'src/components/MainContent';

function LandingPage() {
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <MainLayout 
        selectedPage={selectedPage} 
        setSelectedPage={setSelectedPage}>
      <MainContent 
        selectedPage={selectedPage} 
        setSelectedPage={setSelectedPage} 
        />
    </MainLayout>
  );
}

export default LandingPage;
