import React, { createContext, useState } from 'react';

// Create a new context
const AppContext = createContext();

export default AppContext;

// Create a custom hook to use the context
/*export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Create a provider component to wrap the app and provide the state and functions
export const AppStateProvider = ({  children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [arenaEndPoint, setArenaEndPoint] = useState(null);

  return (
    <AppContext.Provider value={{ selectedItem, setSelectedItem, selectedPage, setSelectedPage,arenaEndPoint, setArenaEndPoint }}>
      {children}
    </AppContext.Provider>
  );
};
*/