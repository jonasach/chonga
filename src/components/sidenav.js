import React, { useContext } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';
import { menuItems } from './menuConfig';

function SideNav({ onSelect }) { // Added the onSelect prop here
  const theme = useTheme();
  const { setExternalUrl, setArenaEndPoint, setArenaListName, setArenaListNumber, setSelectedPage } = useContext(AppContext);

  // Determine text and background color based on theme
  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  const handleClick = (item) => {
    if (item.selectedPage === 'externalLink') {
      setExternalUrl('https://your-url-here'); // Replace with the URL
      return;
    }
    setSelectedPage(item.selectedPage);
    setArenaEndPoint(item.arenaEndPoint);
    setArenaListName(item.arenaListName);
    setArenaListNumber(item.arenaListNumber);

    onSelect(); // This will trigger the ListNav to show
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
             <div style={{ color: textColor }}>{" > "}</div> {/* Adding the ">" symbol */}
            </ListItemButton>
             <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default SideNav;
