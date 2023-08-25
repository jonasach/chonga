
import React, { useEffect, useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';


export default function RawOutput() {

  const {
    externalURL
  } = useContext(AppContext);

  // if we are getting a file
  useEffect(() => {
    // Your useEffect logic here (if needed)
    // ...
  }, [externalURL]);

  return (
    <iframe 
      frameborder="0" 
      src={externalURL} 
      width="100%" 
      height="1500" 
      allowTransparency="false">
    </iframe>
  );
}
