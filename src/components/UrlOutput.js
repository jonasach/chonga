
import React, { useEffect, useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function UrlOutput() {
  const isXS = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const {
    selectedGUID, arenaEndPoint, arenaSessionId, externalURL
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
      height="950px" 
      allowTransparency="false">
    </iframe>
  );
}
