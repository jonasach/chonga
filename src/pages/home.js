import React, { useState, useEffect } from 'react';
import MainLayout from 'src/layouts/LandingPage/layout';
import { useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';import AppContext from 'src/contexts/ArenaContext'; // If needed

function Home() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const isSM = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMD = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLG = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));

  const [showSideNav, setShowSideNav] = useState(true);
  const [showListNav, setShowListNav] = useState(false);
  const [showMainBody, setShowMainBody] = useState(false);
  const [showSettingsNav, setShowSettingsNav] = useState(false);

  const [populateSideNav, setPopulateSideNav] = useState(true);
  const [populateListNav, setPopulateListNav] = useState(false);
  const [populateMainBody, setPopulateMainBody] = useState(false);

  const [selectedItem, setSelectedItem] = useState("default");
  const [selectedPage, setSelectedPage] = useState("default");
  const [arenaEndPoint, setArenaEndPoint] = useState("default");
  const [arenaSearchEndPoint, setArenaSearchEndPoint] = useState("default");

  const [arenaListName, setArenaListName] = useState("default");
  const [arenaListNumber, setArenaListNumber] = useState("default");
  const [arenaSessionId, setArenaSessionId] = useState("default");

  const [externalURL, setExternalURL] = useState("default");
  const [searchParams, setSearchParams] = useState("default");
  const [outputPage, setOutputPage] = useState("default");


  const [selectedGUID, setSelectedGUID] = useState(null);

  useEffect(() => {
    const storedSessionId = document.cookie.split('; ').reduce((acc, cookie) => {
      console.log('home.js.Stored session ID:', '10');
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
      
    }, {}).arenaSessionId;
    setArenaSessionId(storedSessionId);  
      //console.log('home.js.arenaSessionId:47', arenaSessionId );
    if (storedSessionId) {
      //console.log('home.js.storedSessionId:49', storedSessionId);
      setArenaSessionId(storedSessionId);
      //console.log('home.js.arenaSessionId51', arenaSessionId);   
    }
  }, []);


  useEffect(() => {
    // Your existing useEffect code for arenaSessionId
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          showSideNav, setShowSideNav,
          showListNav, setShowListNav,
          showMainBody, setShowMainBody,
          showSettingsNav, setShowSettingsNav,
          populateSideNav, setPopulateSideNav,
          populateListNav, setPopulateListNav,
          populateMainBody, setPopulateMainBody,
          selectedItem, setSelectedItem,
          selectedPage, setSelectedPage,
          arenaEndPoint, setArenaEndPoint,
          arenaSearchEndPoint, setArenaSearchEndPoint,
          arenaListName, setArenaListName,
          arenaListNumber, setArenaListNumber,
          arenaSessionId, setArenaSessionId,
          selectedGUID, setSelectedGUID,
          externalURL, setExternalURL,
          searchParams, setSearchParams,
          outputPage, setOutputPage,
          isXS, isSM, isMD, isLG, isXL,
        }}
      >
        <MainLayout 
          selectedPage={selectedPage} 
          setSelectedPage={setSelectedPage}
        >
          {/* Your content and components */}
        </MainLayout>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default Home;
