// useSession.js

import { useContext, useEffect } from 'react';
import AppContext from 'src/contexts/ArenaContext';

function useSession() {
  const { arenaSessionId, setArenaSessionId } = useContext(AppContext);

  useEffect(() => {
    // Check if the session ID is present in the context
    if (!arenaSessionId) {
      // If not, try to retrieve it from session storage
      const sessionIdFromStorage = sessionStorage.getItem('arenaSessionId');
      if (sessionIdFromStorage) {
        setArenaSessionId(sessionIdFromStorage);
      } else {
        // Handle the case where there is no valid session ID (e.g., redirect to login)
      }
    }
  }, [arenaSessionId, setArenaSessionId]);

  // Return the session ID so that the component can use it
  return arenaSessionId;
}

export default useSession;
