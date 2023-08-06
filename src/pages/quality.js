import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';


function Quality() {
  const router = useRouter();
  const { sessionId, endpoint } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(sessionId);
    const endpoint1='qualityprocesses?template.guid=HZJ27VMR84NJ2L4FZGTM'
    console.log(endpoint1);
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
              <ListItem key={quality.guid}>
                <ListItemButton>
                  <ListItemText
                    primary={`Quality Name: ${quality.name}`}
                    secondary={`Number: ${quality.number}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <div>Loading data...</div>
        )}
      </div>
    );
  }
  
  export default Quality;
  