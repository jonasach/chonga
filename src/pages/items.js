import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function Items() {
  const router = useRouter();
  const { sessionId, endpoint } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(sessionId);
    const endpoint1='items'
    console.log(endpoint);
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
      <h1>Hello from Arena's Items</h1>
      {data ? (
        <div>
          <h2>A sampling of Items</h2>
          <Grid container spacing={4}>
            {data.results.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.guid}>
                <Card>
                  <div style={{ backgroundColor: '#6ebe4c', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" style={{ color: 'white' }}><strong>Number:</strong> {item.number}</Typography>
                  </div>
                  <CardContent style={{ backgroundColor: '#e0e0e0' }}>

                      <Typography variant="body2"><strong>Name:</strong> {item.name}</Typography>
                      <Typography variant="body2"><strong>Number:</strong> {item.number}</Typography>
                      <Typography variant="body2"><strong>Revision Number:</strong> {item.revisionNumber}</Typography>
                      <Typography variant="body2"><strong>Assembly Type:</strong> {item.assemblyType}</Typography>
                      <Typography variant="body2"><strong>Creation Date:</strong> {item.creationDateTime}</Typography>
                      <Typography variant="body2"><strong>Effective Date:</strong> {item.effectiveDateTime}</Typography>
                      <Typography variant="body2"><strong>Category Name:</strong> {item.category.name}</Typography>
                      <Typography variant="body2"><strong>Lifecycle Phase:</strong> {item.lifecyclePhase.name}</Typography>
                      <Typography variant="body2"><strong>Revision Status:</strong> {item.revisionStatus}</Typography>
                      <Typography variant="body2"><strong>In Assembly:</strong> {item.inAssembly ? 'Yes' : 'No'}</Typography>
                      <Typography variant="body2"><strong>API URL:</strong> <a href={item.url.api}>{item.url.api}</a></Typography>
                      <Typography variant="body2"><strong>App URL:</strong> <a href={item.url.app}>{item.url.app}</a></Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
}

export default Items;
