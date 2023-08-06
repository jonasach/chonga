import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox'; // Example icon for "Get Item"
import GradeIcon from '@mui/icons-material/Grade'; // Example icon for "Get Quality"

function Sidenav({ setSelectedPage }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible, setMenuVisible] = useState(true); // State to manage visibility

  const handleClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div style={{ backgroundColor: 'lightgrey', height: '100%', color: 'black' }}>
      {menuVisible && (
        <List>
          <ListItem button onClick={() => handleClick('items')} style={{ color: 'black' }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Get Item" style={{ color: 'black' }} />}
          </ListItem>
          <ListItem button onClick={() => handleClick('quality')} style={{ color: 'black' }}>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Get Quality" style={{ color: 'black' }} />}
          </ListItem>
        </List>
      )}
    </div>
  );
}

export default Sidenav;
