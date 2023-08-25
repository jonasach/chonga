// hooks/useArenaQualityTemplates.js
import { useEffect,useContext } from 'react';
import axios from 'axios';
import useSession from 'src/hooks/useSession';
import AppContext from 'src/contexts/ArenaContext';


function useArenaQualityTemplates() {
  console.log( "useArenaQualityTemplates:arenaQualityTemplates", "line 9")

  const {qualityTemplates, setQualityTemplates, arenaSessionId } = useContext(AppContext);

  console.log( "useArenaQualityTemplates:arenaSessionId", arenaSessionId)

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
  }, [arenaSessionId]);
}

export default useArenaQualityTemplates;
