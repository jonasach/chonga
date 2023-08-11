import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import { FcWorkflow,FcSettings, FcBiohazard, FcTreeStructure, FcDocument, FcGraduationCap, 
  FcBarChart, FcPlanner, FcInspection, FcFactory, FcProcess } from 'react-icons/fc';
import AppContext from 'src/contexts/ArenaContext';
import { menuItems } from './menuConfig';

function Sidenav({}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible] = useState(true);
  const { setExternalUrl, setArenaEndPoint, setArenaListName, setArenaListNumber, setSelectedPage, selectedGUID } = useContext(AppContext);

  const handleClick = (item) => {
    if (item.selectedPage === 'externalLink') {
      setExternalUrl('https://your-url-here'); // Replace with the URL
      return;
    }
    setSelectedPage(item.selectedPage);
    setArenaEndPoint(item.arenaEndPoint);
    setArenaListName(item.arenaListName);
    setArenaListNumber(item.arenaListNumber);
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100%', color: 'black' }}>
      {menuVisible && (
        <List>
      <div style={{ padding: '16px' }}>
        </div>
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItem button onClick={() => handleClick(item)} style={{ color: 'black' }}>
                <ListItemIcon>
                  {React.createElement(require('react-icons/fc')[item.icon], { size: 32 })}
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary={item.label} style={{ color: 'black' }} />}
              </ListItem>
              {index === 2 || index === 4 || index === 7 || index === 8 ? <Divider /> : null}
            </div>
          ))}
          
        </List>
      )}
    </div>
  );
}

export default Sidenav;
