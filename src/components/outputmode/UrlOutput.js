
import React, { useEffect, useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function UrlOutput() {

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
    src={externalURL} 
    width="100%" 
    height="1200"
    style={{
      transform: 'scale(.8)',
      transformOrigin: '0 0',
    }}
  >
  </iframe>
);
  }

