import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ListNav() {

  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedItemGuid, setSelectedItemGuid] = useState(null);

  const {
    setSelectedGUID,
    selectedItemWorld,
    setShowMainBody,
    showListNav,
    setShowListNav,
    arenaSessionId,
    selectedSideNavValue, 
  } = useContext(AppContext);

  const [data, setData] = useState(null);
  const textColor = theme.palette.text.primary;

  const handleItemClick = (guid) => {
    
    setSelectedGUID(guid);

    if (isMdOrLess) {
      setShowListNav(false); // Hide ListNav
      setShowMainBody(true); // Show MainBody
    }
  };


  useEffect(() => {
    const arenaEndPoint = selectedItemWorld?.arenaEndPoint;
    const arenaSearchEndPoint = selectedItemWorld?.arenaSearchEndPoint;
  
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        // If arenaSearchEndPoint is not empty, use it. Otherwise, use arenaEndPoint.
        const endpoint = arenaSearchEndPoint ? arenaSearchEndPoint : arenaEndPoint;
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${endpoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(); // Move this line inside the if block
    } else {
      setData(null);
    }
  }, [selectedItemWorld, showListNav, selectedSideNavValue, ]);
  

  return (
    <Box sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <List>
        {data && data.results ? (
          data.results.map((item) => (
            <React.Fragment key={item.guid}>
              <ListItemButton onClick={() => handleItemClick(item.guid)}>
                <ListItemText
                  primary={<span>Number: {item[selectedItemWorld?.arenaListName]}</span>}
                  secondary={`Name: ${item[selectedItemWorld?.arenaListNumber]}`}
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
