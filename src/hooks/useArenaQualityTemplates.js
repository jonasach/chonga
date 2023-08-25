// hooks/useArenaQualityTemplates.js
import React, { useEffect,useContext } from 'react';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';

function useArenaQualityTemplates() {

  const {setQualityTemplates, arenaSessionId } = useContext(AppContext);

  useEffect(() => {
    if (arenaSessionId) {
      const fetchData = async () => {
        try {
          const endpoint = "settings/qualityprocesses/templates";
          const response = await axios.get(`/api/arenaget?endpoint=${endpoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setQualityTemplates(response.data);
          console.log( "useArenaQualityTemplates:arenaQualityTemplates:line 24", response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId,setQualityTemplates]);
}

export default useArenaQualityTemplates;
