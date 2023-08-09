import React, { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import AppContext from 'src/contexts/ArenaContext';

function MainContent() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [Component, setComponent] = useState(null);
  const { arenaSessionId, selectedPage, setSelectedPage, setSelectedItem } = useContext(AppContext); // Destructure selectedPage, setSelectedPage, setSelectedItem

  console.log("What is selected", selectedPage);

  useEffect(() => {
    const DynamicComponent = dynamic(() => import(`../pages/${selectedPage}`)); // Use template literal and remove extra }
    setComponent(
      <DynamicComponent 
        setSelectedItem={setSelectedItem}
        setSelectedPage={setSelectedPage}
        arenaSessionId={arenaSessionId} 
      />
    );
  }, [selectedPage, arenaSessionId]); 
  
  return <div>{Component}</div>;
}

export default MainContent;
