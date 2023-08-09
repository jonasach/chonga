
import { useState,useEffect } from 'react';
import AppContext  from 'src/contexts/ArenaContext';


function App ({Component,pageProps}){
  const [selectedItem, setSelectedItem] = useState("default");
  const [selectedPage, setSelectedPage] = useState("default");
  const [arenaEndPoint, setArenaEndPoint] = useState("default");
  const [arenaListName, setArenaListName] = useState("default");
  const [arenaListNumber, setArenaListNumber] = useState("default");
  const [arenaSessionId, setArenaSessionId] = useState("default");

  useEffect(() => {
    console.log("Updated arenaSessionId:", arenaSessionId);
  }, [arenaEndPoint,arenaSessionId]); // React to changes in selectedEndpoin

  return (
        <AppContext.Provider 
          value={
              {
              arenaSessionId, setArenaSessionId,
              selectedItem, setSelectedItem,
              selectedPage, setSelectedPage,
              arenaEndPoint, setArenaEndPoint,
              arenaListName, setArenaListName,
              arenaListNumber, setArenaListNumber
              }
            }>     
          <Component {...pageProps} />
        </AppContext.Provider>
  );
};

export default App;

