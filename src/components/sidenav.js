import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox'; // Example icon for "Get Item"
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AppContext from '../contexts/ArenaContext';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


function Sidenav({ setSelectedPage, setSelectedItem }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible, setMenuVisible] = useState(true); // State to manage visibility
  const context = useContext(AppContext)

  const handleClick = (page, arenaEndPoint) => {
      setSelectedPage(page);    
      context.setArenaEndPoint(arenaEndPoint);
  };

  return (
    <div style={{ backgroundColor: 'lightgrey', height: '100%', color: 'black' }}>
      {menuVisible && (
        <List>

          <ListItem button onClick={() => handleClick('arenalist','items')} style={{ color: 'black' }}>
            <ListItemIcon>
              <FormatListNumberedIcon style={{ color: '#3f51b5' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Item" style={{ color: 'black' }} />}
          </ListItem>

          <ListItem button onClick={() => handleClick('arenalist','qualityprocesses')} style={{ color: 'black' }}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: 'red' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Quality" style={{ color: 'black' }} />}
          </ListItem>

          <ListItem button onClick={() => handleClick('arenachanges','changes')} style={{ color: 'black' }}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: 'green' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Changes" style={{ color: 'black' }} />}
          </ListItem>

          <ListItem button onClick={() => handleClick('arenachanges','requests')} style={{ color: 'black' }}>
            <ListItemIcon>
              <ContentPasteIcon style={{ color: 'green' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Requests" style={{ color: 'black' }} />}
          </ListItem>


          <ListItem button onClick={() => handleClick('arenalist','trainingplans')} style={{ color: 'black' }}>
            <ListItemIcon>
              <BookIcon style={{ color: 'purple' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Training" style={{ color: 'black' }} />}
          </ListItem>


        </List>
      )}
    </div>
  );
}

export default Sidenav;
