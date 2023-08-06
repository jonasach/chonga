// MainContent.js
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MainContent() {
  const router = useRouter();
  const { page, sessionId } = router.query;
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (page) {
      const DynamicComponent = dynamic(() => import(`../pages/${page}`));
      setComponent(<DynamicComponent sessionId={sessionId} />);
    }
  }, [page, sessionId]);

  return <div>{Component}</div>;
}

export default MainContent;
