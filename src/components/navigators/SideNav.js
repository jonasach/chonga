import React, { useContext, useState } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon, Collapse, Divider, ListItem } from '@mui/material';
import menuItems from '../../../config/arenaworlds.json';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppContext from 'src/contexts/ArenaContext';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function SideNav() {
  const {
    setShowListNav,
    setShowSideNav,
    setShowMainBody,
    setSelectedItemWorld, setExternalURL
  } = useContext(AppContext);

  const theme = useTheme();
  const isMdOrLess = useMediaQuery(theme.breakpoints.down('md'));
  const textColor = theme.palette.text.primary;
  const [open, setOpen] = useState({});

  const handleClick = (item) => {
    setSelectedItemWorld(item);


    if (item.children) {
      setOpen(prevOpen => ({
        ...prevOpen,
        [item.id]: !prevOpen[item.id]
      }));
      return;
    }
    
    setExternalURL(item.externalURL)

    switch (item.outputPage) {
      case 'FormOutput':
        if (isMdOrLess) {
          setShowSideNav(false);
          setShowListNav(true);
          setShowMainBody(false);
        } else {
          setShowSideNav(true);
          setShowListNav(true);
          setShowMainBody(true);
        }
        break;

      case 'FileOutput':
        setShowSideNav(true);
        setShowListNav(true);
        setShowMainBody(true);
        break;

      case 'UrlOutput':
        if (isMdOrLess) {
          setShowSideNav(false);
          setShowListNav(false);
          setShowMainBody(true);
        } else {
          setShowSideNav(true);
          setShowListNav(true);
          setShowMainBody(true);
        }
        break;

      case 'CalendarOutput':
        break;

      case 'RawOutput':
        if (isMdOrLess) {
          setShowSideNav(false);
          setShowListNav(true);
          setShowMainBody(false);
        } else {
          setShowSideNav(true);
          setShowListNav(true);
          setShowMainBody(true);
        }
        break;

      default:
        console.warn(`Unknown outputPage value: ${item.outputPage}`);
        break;
    }

  };
  const renderMenuItems = (items, parentId = null) => {
    return items
      .filter(item => item.parentId === parentId)
      .map((menuItem) => {
        const children = items.filter(item => item.parentId === menuItem.id);
        const isSvgFile = (icon) => {
          return icon.includes('.png');
      };
        const isSvg = isSvgFile(menuItem.icon);
        return (
          <React.Fragment key={menuItem.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClick(menuItem)} style={{ color: textColor, paddingLeft: menuItem.parentId ? 32 : 16 }}>
              <ListItemIcon>
    {isSvg
        ? <img src={`/assets/logos/${menuItem.icon}`} alt="" style={{ maxWidth: "16%", height: "auto" }} />
        : React.createElement(require('react-icons/fc')[menuItem.icon], { size: 32 })
    }
</ListItemIcon>


{!isSvg && <ListItemText primary={menuItem.label} style={{ color: textColor }} />}
                {children.length > 0 && (open[menuItem.id] ? <ExpandLess /> : <ExpandMore />)}
   
    


              </ListItemButton>
            </ListItem>
            <Divider /> {/* Add Divider here */}
            {children.length > 0 && <Collapse in={open[menuItem.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(items, menuItem.id)}
              </List>
            </Collapse>}
          </React.Fragment>
        );
      });
  };
  
  
  
  
  
return (
    <List>
      {renderMenuItems(menuItems)}
      {menuItems.length > 0 && <Divider />}
    </List>
  );

}

export default SideNav;
