import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import AppContext from '../contexts/ArenaContext';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import StoreIcon from '@mui/icons-material/Store';
import Divider from '@mui/material/Divider';

function Sidenav({ }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible, setMenuVisible] = useState(true); 
  const { setArenaEndPoint, setArenaListName, setArenaListNumber, setSelectedPage } = useContext(AppContext);
  
  const handleClick = (selectedPage,arenaEndPoint,arenaListName,arenaListNumber) => {
    setSelectedPage(selectedPage);
    setArenaEndPoint(arenaEndPoint);
    setArenaListName(arenaListName);
    setArenaListNumber(arenaListNumber);

    };

  return (
    <div style={{ backgroundColor: 'white', height: '100%', color: 'black' }}>
      {menuVisible && (
        <List>

          <ListItem button onClick={() => handleClick('arenalist','items','number','name')} style={{ color: 'black' }}>
            <ListItemIcon>
              <FormatListNumberedIcon style={{ color: '#3f51b5' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Item" style={{ color: 'black' }} />}
          </ListItem>
          <Divider />
   
          <ListItem button onClick={() => handleClick('arenalist','changes','number','title')} style={{ color: 'black' }}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: 'green' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Changes" style={{ color: 'black' }} />}
          </ListItem>

          <ListItem button onClick={() => handleClick('arenalist','requests','number','title')} style={{ color: 'black' }}>
            <ListItemIcon>
              <ContentPasteIcon style={{ color: 'green' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Requests" style={{ color: 'black' }} />}
          </ListItem>

          <Divider />

          <ListItem button onClick={() => handleClick('arenalist','qualityprocesses','number','name')} style={{ color: 'black' }}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: 'red' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Quality" style={{ color: 'black' }} />}
          </ListItem>


          <ListItem button onClick={() => handleClick('arenalist','suppliers','name','description')} style={{ color: 'black' }}>
            <ListItemIcon>
              <StoreIcon style={{ color: 'green' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Suppliers" style={{ color: 'black' }} />}
          </ListItem>


          <ListItem button onClick={() => handleClick('arenalist','trainingplans','number','name')} style={{ color: 'black' }}>
            <ListItemIcon>
              <BookIcon style={{ color: 'purple' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Training" style={{ color: 'black' }} />}
          </ListItem>

          <Divider />
          
          <ListItem
                button
                onClick={() => handleClick('externalLink', '', '', '')}
                style={{ color: 'black' }}
              >
                <ListItemIcon>
                  <BookIcon style={{ color: '#6ebe4c' }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="ThingWorx" style={{ color: 'black' }} />}
          </ListItem>
          
          <Divider />

        </List>
      )}
    </div>
  );
}

export default Sidenav;
