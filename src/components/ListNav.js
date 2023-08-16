import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import useSession from 'src/hooks/useSession';
import useMediaQuery from '@mui/material/useMediaQuery';

function ListNav({ style }) {
  
  const theme = useTheme();

  const {
    setSelectedGUID, selectedGUID,
    setArenaListName,arenaListName,
    setArenaListNumber,arenaListNumber,
    setSelectedPage,selectedPage,
    setArenaEndPoint, arenaEndPoint,
    setArenaSearchEndPoint, arenaSearchEndPoint,
    showSideNav, setShowSideNav ,
    showListNav, setShowListNav ,
    showMainBody, setShowMainBody,
    showSettingsNav, setShowSettingsNav, 
    populateSideNav, setPopulateSideNav ,
    populateListNav, setPopulateListNav ,
    populateMainBody, setPopulateMainBody,
    setArenaSessionId

  } = useContext(AppContext);

  const arenaSessionId = useSession();
  const [data, setData] = useState(null);

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  const isXS = useMediaQuery('(max-width:600px)');
  const isSM = useMediaQuery('(min-width:601px) and (max-width:768px)');
  const isMD = useMediaQuery('(min-width:769px) and (max-width:992px)');
  const isLG = useMediaQuery('(min-width:993px) and (max-width:1200px)');
  const isXL = useMediaQuery('(min-width:1201px)');

  const handleItemClick = (guid) => {
    setSelectedGUID(guid)
    console.log('listnav.showListNav', showListNav)
    
    if (isXS ) {
      setShowSideNav(false);
      setPopulateSideNav(false);
      setShowListNav(false);
      setPopulateListNav(false);
      setShowMainBody(true);
      setPopulateMainBody(true);
    } else if (isSM) {
      setShowSideNav(false);
      setPopulateSideNav(false);
      setShowListNav(true);
      setPopulateListNav(false);
      setShowMainBody(true);
      setPopulateMainBody(true);
    } else {
      setShowListNav(true);
      setPopulateListNav(true);
      setShowMainBody(true);
      setPopulateMainBody(true);
    }
    
    console.log('SideNav.setShowMainBod:1', setShowMainBody )
  
  };

  useEffect(() => {
console.log('SideNav.arenaSearchEndPoint', arenaSearchEndPoint )
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
      fetchData();
    }
    
  }, [arenaSearchEndPoint, arenaEndPoint,setPopulateListNav]); // Empty dependency array means this effect will run once after the initial render

  
  return (
    <div style={{ ...style, backgroundColor: backgroundColor, height: '100%', color: textColor }}>
      {data ? (
        <List>
          {data.results.map((item, index) => (
            <div key={item.guid}>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick(item.guid)}>
                <ListItemText
                    primary={<span>Number: {item[arenaListName]}</span>}
                    secondary={`Name: ${item[arenaListNumber]}`}
                  />
                  <div style={{ color: textColor }}>{" > "}</div>
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      ) : (
        <div>Loading some list data...</div>
      )}
    </div>
  );
}

export default ListNav;
