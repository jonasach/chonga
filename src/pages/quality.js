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
          const response = await axios.get('/api/getquality', {
            headers: { 'arena_session_id': sessionId },
          });
          setData(response.data);

          console.log('Results:', response.data.results); // Log the results
 

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
          <h2>A sampling of qualitys</h2>
          <Grid container spacing={4}>
            {data.results.map((quality) => (
               <Grid item xs={12} sm={6} md={3} key={quality.guid}> {/* Change 'quality' to 'item' */}

                <Card>
                <div style={{ backgroundColor: '#6ebe4c', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" style={{ color: 'white' }}><strong>Number:</strong> {quality.number}</Typography>
                </div>
                  <CardContent style={{ backgroundColor: '#e0e0e0' }}>
                    <Typography variant="body2"><strong>Completed DateTime:</strong> {quality.completedDateTime || 'N/A'}</Typography>
                    <Typography variant="body2"><strong>Creation DateTime:</strong> {quality.creationDateTime}</Typography>
                    <Typography variant="body2"><strong>Creator Email:</strong> {quality.creator.email}</Typography>
                    <Typography variant="body2"><strong>Creator Full Name:</strong> {quality.creator.fullName}</Typography>
                    <Typography variant="body2"><strong>Current Step Name:</strong> {quality.currentStep.name}</Typography>
  
                    <Typography variant="body2" style={{ maxWidth: '200px', overflow: 'auto' }}>
  <strong>Description:</strong> {quality.description}
</Typography>
  
                    <Typography variant="body2"><strong>Guid:</strong> {quality.guid}</Typography>
                    <Typography variant="body2"><strong>Name:</strong> {quality.name}</Typography>
                    <Typography variant="body2"><strong>Number:</strong> {quality.number}</Typography>
                    <Typography variant="body2"><strong>Owner Email:</strong> {quality.owner.email}</Typography>
                    <Typography variant="body2"><strong>Owner Full Name:</strong> {quality.owner.fullName}</Typography>
                    <Typography variant="body2"><strong>Status:</strong> {quality.status}</Typography>
                    <Typography variant="body2"><strong>Status Mode:</strong> {quality.statusMode}</Typography>
                    <Typography variant="body2"><strong>Target DateTime:</strong> {quality.targetCompletionDateTime}</Typography>
                    <Typography variant="body2"><strong>Type:</strong> {quality.type}</Typography>
                    {/* Add other fields as needed */}
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
