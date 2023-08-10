// ArenaCards.js
/*
import { useArenaData } from 'src/hooks/useArenaData';
import { Card, CardContent, Typography } from '@mui/material';
import AppContext from 'src/contexts/ArenaContext';

function ArenaCards() {
  const data = useArenaData();
  const { arenaListName, arenaListNumber } = useContext(AppContext);

  return (
    <div>
      {data ? (
        <div>
          {data.results.map((item, index) => (
            <Card key={item.guid} style={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="h5" color="primary">
                  Number: {item[arenaListName]}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Name: {item[arenaListNumber]}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>Loading some data...</div>
      )}
    </div>
  );
}

export default ArenaCards;
*/
