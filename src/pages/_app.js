
import { useState,useEffect, createContext } from 'react';
import AppContext  from '../contexts/ArenaContext';


function App ({Component,pageProps}){
  const [selectedItem, setSelectedItem] = useState("default");
  const [selectedPage, setSelectedPage] = useState("default");
  const [arenaEndPoint, setArenaEndPoint] = useState("default");

  useEffect(() => {
  }, [arenaEndPoint]); // React to changes in selectedEndpoin

  return (
        <AppContext.Provider 
          value={
            {arenaEndPoint,setArenaEndPoint}
            }>     
          <Component {...pageProps} />
        </AppContext.Provider>
  );
};

export default App;

