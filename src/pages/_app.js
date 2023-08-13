import React, { useState, useEffect } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../../public/css/login.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App({ Component, pageProps }) {
  const [selectedItem, setSelectedItem] = useState("default");
  const [selectedPage, setSelectedPage] = useState("default");
  const [arenaEndPoint, setArenaEndPoint] = useState("default");
  const [arenaListName, setArenaListName] = useState("default");
  const [arenaListNumber, setArenaListNumber] = useState("default");
  const [arenaSessionId, setArenaSessionId] = useState("default");
  // Define the state for selectedGUID
  const [selectedGUID, setSelectedGUID] = useState(null);

  useEffect(() => {
    console.log("Updated arenaSessionId:", arenaSessionId);
  }, [arenaEndPoint, arenaSessionId]); // React to changes in selectedEndpoint

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContext.Provider
        value={
          {
            arenaSessionId, setArenaSessionId,
            selectedItem, setSelectedItem,
            selectedPage, setSelectedPage,
            arenaEndPoint, setArenaEndPoint,
            arenaListName, setArenaListName,
            arenaListNumber, setArenaListNumber,
            selectedGUID, setSelectedGUID // Include selectedGUID and setSelectedGUID in the context value
          }
        }>
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
