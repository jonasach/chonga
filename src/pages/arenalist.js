import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';

function Items() {
  console.log("a.start")
  const router = useRouter();
  const [data, setData] = useState(null);
  const { arenaSessionId, arenaEndPoint,arenaListName, arenaListNumber } = useContext(AppContext);

console.log("arenalist1.arenaEndPoint", arenaEndPoint)
console.log("arenalist1.sessionId", arenaSessionId)

  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      console.log("arenalist.sessionId", arenaSessionId)
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${arenaEndPoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          console.log("arenalist1.js.data:", response.data)
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint]); 

  return (
    <div>
      {data ? (
        <List>
          {data.results.map((item, index) => (
            <div key={item.guid}>
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary={<span style={{ color: '#3f51b5' }}> Number: {item[arenaListName]}</span>}
                    secondary={`Name: ${item[arenaListNumber]}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <div>Loading some data...</div>
      )}
    </div>
  );
}

export default Items;
