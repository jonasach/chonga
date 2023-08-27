import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppContext from 'src/contexts/ArenaContext'; // If needed

function App({ Component, pageProps }) {

  console.log("_app.js:line8", "during server start up ")

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider
        value={{
          // You can provide any global context values here if needed
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
