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
      <h1>Welcome to the Dashboard</h1>
      {data ? (
        <div>
          <h2>Data from server:</h2>
          <Grid container spacing={4}>
            {data.results.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.guid}>
                <Card>
                  <CardContent>
                    {Object.keys(item).map((key) => renderField(key, item[key]))}
                    <Link href={item.url.app} target="_blank">
                      Raw Item Data
                    </Link>
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
