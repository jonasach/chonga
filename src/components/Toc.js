import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox'; // Example icon for "Get Item"
import GradeIcon from '@mui/icons-material/Grade'; // Example icon for "Get Quality"

function Toc({ setSelectedPage }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible, setMenuVisible] = useState(true); // State to manage visibility

  const handleClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      {menuVisible && (
        <List>
          <ListItem button onClick={() => handleClick('items')}>
            <ListItemIcon>
              {isSmallScreen ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Get Item" />}
          </ListItem>
          <ListItem button onClick={() => handleClick('quality')}>
            <ListItemIcon>
              {isSmallScreen ? <GradeIcon /> : <GradeIcon />}
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Get Quality" />}
          </ListItem>
        </List>
      )}
    </div>
  );
}

export default Toc;
