import React, { useContext } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AppContext from 'src/contexts/ArenaContext';
import { menuItems } from './menuConfig';
import useMediaQuery from '@mui/material/useMediaQuery';

function SideNav() {
  const {
    setPopulateMainBody,
    setShowMainBody,
    setShowListNav,
    setPopulateSideNav,
    setPopulateListNav,
    setArenaEndPoint,
    setArenaListName,
    setArenaListNumber,
    setSelectedPage,
  } = useContext(AppContext);

  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;
  const isXS = useMediaQuery('(max-width:600px)');

  const handleClick = (item) => {


    // set the context value here so they dont need to be passed.
    setSelectedPage(item.selectedPage);
    setArenaEndPoint(item.arenaEndPoint);
    setArenaListName(item.arenaListName);
    setArenaListNumber(item.arenaListNumber);

    if (isXS) {
      setShowSideNav(false);
      setPopulateSideNav(false);
      setShowListNav(true);
      setPopulateListNav(true);
      setShowMainBody(false);
      setPopulateMainBody(false);
    } else {
      setShowListNav(true);
      setShowMainBody(true);
      setPopulateListNav(true);
    }
  };

  return (
    <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
      <List>
        <div style={{ padding: '16px' }}></div>
        {menuItems.map((item, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleClick(item)} style={{ color: textColor }}>
              <ListItemIcon>
                {React.createElement(require('react-icons/fc')[item.icon], { size: 32 })}
              </ListItemIcon>
             <ListItemText primary={item.label} style={{ color: textColor }} />
             <div style={{ color: textColor }}>{" > "}</div> 
            </ListItemButton>            
          </div>
        ))}
      </List>
    </div>
  );
}

export default SideNav;
