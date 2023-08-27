import React, { useState, useEffect } from 'react';
import MainLayout from 'src/layouts/LandingPage/layout';
import { useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppContext from 'src/contexts/ArenaContext';
import menuItems from '../../config/arenaworlds.json';
import axios from 'axios';


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

  const [selectedItem, setSelectedItem] = useState("default");

  const [arenaSessionId, setArenaSessionId] = useState("default");

  const [externalURL, setExternalURL] = useState("default");
  const [searchParams, setSearchParams] = useState("default");

  const [outputPage, setOutputPage] = useState("default");
  const [outputPage2, setOutputPage2] = useState("default");

  const [qualityProcessTemplates, setQualityProcessTemplates] = useState("default");
  const [qualityProcessSummmaryAttributes, setQualityProcessSummmaryAttributes] = useState("default");
  const [qualityProcessStepAttributes, setQualityProcessStepAttributes] = useState("default");

  const [itemCategories, setItemCategories] = useState("default");

  const [selectedGUID, setSelectedGUID] = useState(null);
  const [selectedItemWorld, setSelectedItemWorld] = useState(null);

  const [fetchedData, setFetchedData] = useState({});

  useEffect(() => {
    const storedSessionId = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {}).arenaSessionId;
    setArenaSessionId(storedSessionId);
  }, []);

  useEffect(() => {
    if (arenaSessionId === 'default') return;
      const fetchData = async (endpoint, setStateFunction) => {
      try {
        const response = await axios.get(`/api/arenaget?endpoint=${endpoint}`, {
          headers: { 'arena-session-id': arenaSessionId },
        });


console.log("home.js:line 68:response.data", response.data)

        setStateFunction(response.data);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData("settings/qualityprocesses/steps/attributes",setQualityProcessStepAttributes)
    fetchData("settings/qualityprocesses/attributes",setQualityProcessSummmaryAttributes)
    fetchData("settings/qualityprocesses/templates",setQualityProcessTemplates)
    fetchData("settings/items/categories",setItemCategories)


  }, [arenaSessionId] );
  
  // ...
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          showSideNav, setShowSideNav,
          showListNav, setShowListNav,
          showMainBody, setShowMainBody,
          showSettingsNav, setShowSettingsNav,
          selectedItem, setSelectedItem,
          arenaSessionId, setArenaSessionId,
          selectedGUID, setSelectedGUID,
          externalURL, setExternalURL,
          searchParams, setSearchParams,
          outputPage, setOutputPage,
          itemCategories, setItemCategories,
          outputPage2, setOutputPage2,
          selectedItemWorld, setSelectedItemWorld,
          isXS, isSM, isMD, isLG, isXL,
          qualityProcessTemplates, setQualityProcessTemplates,
          qualityProcessSummmaryAttributes, setQualityProcessSummmaryAttributes,
          qualityProcessStepAttributes, setQualityProcessStepAttributes
        }}
      >setQualityProcessSummmaryAttributes
        <MainLayout>
          {/* Your content and components */}
        </MainLayout>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default Home;
