import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function MainContent({ selectedItem, setSelectedItem, selectedPage, setSelectedPage }) {
  const router = useRouter();
  const { page, sessionId } = router.query;
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      // If an item is selected, import and render the details component
      const DetailComponent = dynamic(() => import('../pages/qualitydetail')); // Adjust path accordingly
      setComponent(<DetailComponent item={selectedItem} />);
    } else if (page) {
      // If a page is selected, import and render the page component
      const DynamicComponent = dynamic(() => import(`../pages/${page}`));
      setComponent(<DynamicComponent setSelectedItem={setSelectedItem} sessionId={sessionId} />); // Pass setSelectedItem as a prop
    }
  }, [page, selectedItem, sessionId, selectedPage]); // Add selectedPage as a dependency

  return <div>{Component}</div>;
}

export default MainContent;
