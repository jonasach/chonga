import { useState, useEffect } from 'react';
import AppContext from 'src/contexts/ArenaContext';

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

  return (
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
  );
};

export default App;
