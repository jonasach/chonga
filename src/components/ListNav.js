import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ListNav({ style }) {
  
  const theme = useTheme();

  const {
    setSelectedGUID,
    arenaListName,
    arenaListNumber,
    arenaEndPoint,
    arenaSearchEndPoint,
   arenaSessionId

  } = useContext(AppContext);

  const [data, setData] = useState(null);
  const textColor = theme.palette.text.primary;

  const handleItemClick = (guid) => {
    setSelectedGUID(guid)
  };
  
  useEffect(() => {
    console.log('ListNav.js:arenaSessionId', arenaSessionId)
    console.log('ListNav.js:arenaEndPoint', arenaEndPoint)

    if (arenaSessionId && arenaEndPoint ) {
      const fetchData = async () => {
        // If arenaSearchEndPoint is not empty, use it. Otherwise, use arenaEndPoint.
        console.log('ListNav.js:arenaEndPoint', 'line 37')
        const endpoint = arenaSearchEndPoint ? arenaSearchEndPoint : arenaEndPoint;
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${endpoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
          console.log('ListNav.js:response.data)', response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
    
  }, [arenaEndPoint]); 


  return (
    <Box sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
    <List>
      {data && data.results ? (
        data.results.map((item, index) => (
          <React.Fragment key={item.guid}>
            <ListItemButton onClick={() => handleItemClick(item.guid)}>
              <ListItemText
                primary={<span>Number: {item[arenaListName]}</span>}
                secondary={`Name: ${item[arenaListNumber]}`}
              />
              <div style={{ color: textColor }}>{" > "}</div>
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
    </List>
    </Box>
  );
  
}

export default ListNav;
