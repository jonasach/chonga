// useArenaData.js
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';

export function useArenaData() {
  const { arenaSessionId, arenaEndPoint } = useContext(AppContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${arenaEndPoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint]);

  return data;
}
