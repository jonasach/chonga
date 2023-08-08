import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import QualityDetail from './qualitydetail'; // Import the QualityDetail component here

function Quality() {
  const router = useRouter();
  const { sessionId, endPoint } = router.query; // Here sessionId is from the query, not a prop
  const [data, setData] = useState(null);
const selectedItem = null

  useEffect(() => {
    const endpoint1 = 'qualityprocesses';
    if (sessionId && endpoint1) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${endpoint1}`, {
            headers: { 'arena_session_id': sessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [sessionId, endpoint]);

  return (
    <div>
      {data ? (
        <List>
          {data.results.map((quality, index) => (
            <div key={quality.guid}>
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary={<span style={{ color: 'red' }}>Name: {Number.number}</span>}
                    secondary={`name: ${quality.name}`}
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

export default Quality;
