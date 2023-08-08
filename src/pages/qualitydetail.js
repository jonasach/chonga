import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Button } from '@mui/material';

function QualityDetail() {
  const router = useRouter();
  const { guid, arena_session_id } = router.query;
  const [data, setData] = useState(null);

  const handleBackToQuality = () => {
    //onClick={props.handleBackToQuality}
    props.handleBackToQuality();
    //  router.push('/quality'); // Redirect to the quality page
  };

  useEffect(() => {
    if (guid) {
      const endpoint1 = encodeURIComponent(`qualityprocesses/${guid}`);
      console.log("what endpoint am i sending from quality detail ", endpoint1);

      const fetchData = async () => {
        try {

          const response = await axios.get(`/api/arenaget?endpoint=${endpoint1}`, {
            headers: { 'arena_session_id': arena_session_id }, // Include the arena_session_id here
          });

          setData(response.data);
        } catch (error) {
          console.error('Error fetching quality detail data:', error);
        }
      };
      fetchData();
    }
  }, [guid]);

  return (
    <div>
      {data ? (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <div style={{ backgroundColor: '#3f51b5', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" style={{ color: 'white' }}><strong>Number:</strong> {data.number}</Typography>
              </div>
              <CardContent style={{ backgroundColor: '#e0e0e0' }}>
                <Typography variant="body2"><strong>Completed DateTime:</strong> {data.completedDateTime || 'N/A'}</Typography>
                <Typography variant="body2"><strong>Creation DateTime:</strong> {data.creationDateTime}</Typography>
                <Typography variant="body2"><strong>Creator Email:</strong> {data.creator.email}</Typography>
                <Typography variant="body2"><strong>Creator Full Name:</strong> {data.creator.fullName}</Typography>
                <Typography variant="body2"><strong>Current Step Name:</strong> {data.currentStep.name}</Typography>
                <Typography variant="body2"><strong>Description:</strong> {data.description}</Typography>
                <Typography variant="body2"><strong>Guid:</strong> {data.guid}</Typography>
                <Typography variant="body2"><strong>Name:</strong> {data.name}</Typography>
                <Typography variant="body2"><strong>Number:</strong> {data.number}</Typography>
                <Typography variant="body2"><strong>Owner Email:</strong> {data.owner.email}</Typography>
                <Typography variant="body2"><strong>Owner Full Name:</strong> {data.owner.fullName}</Typography>
                <Typography variant="body2"><strong>Status:</strong> {data.status}</Typography>
                <Typography variant="body2"><strong>Status Mode:</strong> {data.statusMode}</Typography>
                <Typography variant="body2"><strong>Target DateTime:</strong> {data.targetCompletionDateTime}</Typography>
                <Typography variant="body2"><strong>Type:</strong> {data.type}</Typography>
                {/* Add other fields as needed */}
                              <Button 
                variant="contained" 
                style={{ backgroundColor: '#3f51b5', color: 'white' }} 
                onClick={handleBackToQuality}
              >
                Back to Quality
              </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div>Loading a single quality record data...</div>
      )}
    </div>
  );
}

export default QualityDetail;
