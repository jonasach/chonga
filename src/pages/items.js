import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Link } from '@mui/material';

function Dashboard() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/getitem', {
            headers: { 'arena_session_id': sessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [sessionId]);

  const renderField = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).map((subKey) => renderField(`${key}.${subKey}`, value[subKey]));
    }

    return (
      <Typography variant="body2" key={key}>
        <strong>{key}:</strong> {value}
      </Typography>
    );
  };

  return (
    <div>
      <h1>Hello from Arena's RESTAPI</h1>
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
                    <Typography variant="body2"><strong>Assembly Type:</strong> {item.assemblyType}</Typography>
                    <Typography variant="body2"><strong>Category GUID:</strong> {item.category.guid}</Typography>
                    <Typography variant="body2"><strong>Category Name:</strong> {item.category.name}</Typography>
                    <Typography variant="body2"><strong>Creation Date Time:</strong> {item.creationDateTime}</Typography>
                    <Typography variant="body2"><strong>Effective Date Time:</strong> {item.effectiveDateTime}</Typography>
                    <Typography variant="body2"><strong>GUID:</strong> {item.guid}</Typography>
                    <Typography variant="body2"><strong>In Assembly:</strong> {item.inAssembly.toString()}</Typography>
                    <Typography variant="body2"><strong>Lifecycle Phase GUID:</strong> {item.lifecyclePhase.guid}</Typography>
                    <Typography variant="body2"><strong>Lifecycle Phase Name:</strong> {item.lifecyclePhase.name}</Typography>
                    <Typography variant="body2"><strong>Name:</strong> {item.name}</Typography>
                    <Typography variant="body2"><strong>Number:</strong> {item.number}</Typography>
                    <Typography variant="body2"><strong>Revision Number:</strong> {item.revisionNumber}</Typography>
                    <Typography variant="body2"><strong>Revision Status:</strong> {item.revisionStatus}</Typography>
                    <Typography variant="body2"><strong>URL (API):</strong> <a href={item.url.api} target="_blank" rel="noreferrer">{item.url.api}</a></Typography>
                    <Typography variant="body2"><strong>URL (App):</strong> <a href={item.url.app} target="_blank" rel="noreferrer">{item.url.app}</a></Typography>
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

export default Dashboard;
