import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from '../contexts/ArenaContext';

function Items() {
  const router = useRouter();
  const { sessionId, endpoint } = router.query;
  const [data, setData] = useState(null);
  const { arenaEndPoint } = useContext(AppContext); // Get the arenaEndPoint from the context

  useEffect(() => {
    if (sessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${arenaEndPoint}`, {
            headers: { 'arena_session_id': sessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [sessionId, arenaEndPoint]); // React to changes in sessionId and arenaEndPoint

  return (
    <div>
      {data ? (
        <List>
          {data.results.map((item, index) => (
            <div key={item.guid}>
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary={<span style={{ color: '#3f51b5' }}> Number: {item.number}</span>}
                    secondary={`Name: ${item.title}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default Items;
