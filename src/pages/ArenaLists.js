// src/components/ArenaList.js
/*
import { useArenaData } from 'src/hooks/useArenaData';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';
import { useContext } from 'react';

function ArenaList() {
  const data = useArenaData();
  const { arenaListName, arenaListNumber } = useContext(AppContext);

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

export default ArenaList;
*/