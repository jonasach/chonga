import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AppContext from '../contexts/ArenaContext';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BookIcon from '@mui/icons-material/Book';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';


function Sidenav({ }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuVisible, setMenuVisible] = useState(true); 
  const { setArenaEndPoint, setArenaListName, setArenaListNumber, setSelectedPage } = useContext(AppContext);
  
  const handleClick = (selectedPage,arenaEndPoint,arenaListName,arenaListNumber) => {
    console.log("clickaway the moments that make up a dull day");
    console.log("arenaEndPoint:", arenaEndPoint);
    console.log("arenaListName:", arenaListName);
    console.log("arenaListNumber:", arenaListNumber);
    console.log("page:", selectedPage);

    setSelectedPage(selectedPage);
    
    setArenaEndPoint(arenaEndPoint);
    setArenaListName(arenaListName);
    setArenaListNumber(arenaListNumber);

    };

  return (
    <div style={{ backgroundColor: 'lightgrey', height: '100%', color: 'black' }}>
      {menuVisible && (
        <List>

          <ListItem button onClick={() => handleClick('arenalist','items','number','name')} style={{ color: 'black' }}>
            <ListItemIcon>
              <FormatListNumberedIcon style={{ color: '#3f51b5' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Item" style={{ color: 'black' }} />}
          </ListItem>

          <ListItem button onClick={() => handleClick('arenalist','qualityprocesses','number','name')} style={{ color: 'black' }}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: 'red' }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Quality" style={{ color: 'black' }} />}
          </ListItem>

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


          <ListItem button onClick={() => handleClick('arenalist','trainingplans','number','')} style={{ color: 'black' }}>
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
