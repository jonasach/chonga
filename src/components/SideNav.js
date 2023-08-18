import React, { useContext } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppContext from 'src/contexts/ArenaContext';
import { menuItems } from './menuConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

function SideNav() {

  
  const {
    setArenaListName,
    setArenaListNumber,
    setSelectedPage,
    setArenaEndPoint, 
    setArenaSearchEndPoint
  } = useContext(AppContext);
  
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const handleClick = (item) => {
    if (item.selectedPage !== 'externalLink') { // Check if selectedPage is not 'externalLink'   
      setSelectedPage(item.selectedPage);

      setArenaEndPoint(item.arenaEndPoint);
      setArenaSearchEndPoint(item.arenaSearchEndPoint);

      setArenaListName(item.arenaListName);
      setArenaListNumber(item.arenaListNumber);
    } else {
      setSelectedPage(item.selectedPage);

      setArenaEndPoint(item.arenaEndPoint);

    }

  };
  return (
    <List>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.label}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(item)} style={{ color: textColor }}>
              <ListItemIcon>
                {React.createElement(require('react-icons/fc')[item.icon], { size: 32 })}
              </ListItemIcon>
              <ListItemText primary={item.label} style={{ color: textColor }} />
            </ListItemButton>
          </ListItem>
          {index !== menuItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
      };
export default SideNav;
