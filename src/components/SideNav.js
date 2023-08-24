import React, { useContext } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import menuItems from '../../config/arenaworlds.json';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppContext from 'src/contexts/ArenaContext';

function SideNav() {

  const {
    setArenaListName,
    setArenaListNumber,
    setSelectedPage,
    setArenaEndPoint,
    setArenaSearchEndPoint,
    setShowListNav,
    showSideNav,
    setShowSideNav,
    setShowMainBody, setExternalURL,
    outputPage, setOutputPage

  } = useContext(AppContext);
  
  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));

  const textColor = theme.palette.text.primary;
  const handleClick = (item) => {

  console.log('sidenav.js.line 33:isMdOrLess',isMdOrLess )

      setOutputPage(item.outputPage);

    if (isMdOrLess) {
      console.log('sidenav.js.line 36:isMdOrLess',isMdOrLess )
      setShowSideNav(false); // Hide SideNav
      setShowListNav(true);  // Show ListNav
    }

    if (item.selectedPage !== 'externalLink') {


      setSelectedPage(item.selectedPage);
      setArenaEndPoint(item.arenaEndPoint);
      setArenaSearchEndPoint(item.arenaSearchEndPoint);
      setArenaListName(item.arenaListName);
      setArenaListNumber(item.arenaListNumber);
    } else {
      setShowSideNav(true); // Hide SideNav
      setShowListNav(false); // Hide ListNav
      setShowMainBody(true); // Show MainBody

      setExternalURL(item.arenaEndPoint)
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
