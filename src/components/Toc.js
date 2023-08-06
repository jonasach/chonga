import { List, ListItem, ListItemText } from '@mui/material';

function Toc({ setSelectedPage }) {
  return (
    <div>
      <List>
        <ListItem button onClick={() => setSelectedPage('items')}> 
          <ListItemText primary="Get Item" />
        </ListItem>
        <ListItem button onClick={() => setSelectedPage('quality')}>
          <ListItemText primary="Get Quality" />
        </ListItem>
      </List>
    </div>
  );
}

export default Toc;
