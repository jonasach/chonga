import React, { useState, useEffect } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'; // Removed useMediaQuery here
import { useMediaQuery } from '@mui/material'; // Correct import path for useMediaQuery
import CssBaseline from '@mui/material/CssBaseline';
import '../../public/css/login.css';

function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // Define the state for visibility controls
  const [showSideNav, setShowSideNav] = useState(true);
  const [showListNav, setShowListNav] = useState(false);
  const [showMainBody, setShowMainBody] = useState(false);
  const [showSettingsNav, setShowSettingsNav] = useState(false); // Add this line

  // Define the state for loading controls
  const [populateSideNav, setPopulateSideNav] = useState(true);
  const [populateListNav, setPopulateListNav] = useState(false);
  const [populateMainBody, setPopulateMainBody] = useState(false);

  // Breakpoints
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const isSM = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMD = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLG = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));


  const [selectedItem, setSelectedItem] = useState("default");
  const [selectedPage, setSelectedPage] = useState("default");
  const [arenaEndPoint, setArenaEndPoint] = useState("default");
  const [arenaListName, setArenaListName] = useState("default");
  const [arenaListNumber, setArenaListNumber] = useState("default");
  const [arenaSessionId, setArenaSessionId] = useState("default");
  
  const [selectedGUID, setSelectedGUID] = useState(null);

  useEffect(() => {
    console.log("Updated arenaSessionId:", arenaSessionId);
  }, [arenaEndPoint, arenaSessionId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          arenaSessionId, setArenaSessionId,
          selectedItem, setSelectedItem,
          selectedPage, setSelectedPage,
          arenaEndPoint, setArenaEndPoint,
          arenaListName, setArenaListName,
          arenaListNumber, setArenaListNumber,
          selectedGUID, setSelectedGUID,
          showSideNav, setShowSideNav,
          showListNav, setShowListNav,
          showMainBody, setShowMainBody,
          populateSideNav, setPopulateSideNav,
          populateListNav, setPopulateListNav,
          populateMainBody, setPopulateMainBody,
          setShowSettingsNav, showSettingsNav,
          isXS, isSM, isMD, isLG, isXL
        }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
