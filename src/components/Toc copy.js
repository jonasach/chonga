import { List, ListItem, ListItemText } from '@mui/material';

function Toc({ setSelectedPage }) {
  console.log('Toc rendered'); // Logs when the component is rendered

  const handleClick = (page) => {
    console.log('ListItem clicked', page); // Logs when a ListItem is clicked and the page it represents
    console.log('Calling setSelectedPage with', page); // Logs the value being passed to setSelectedPage
    setSelectedPage(page);
  };

  return (
    <div>
      <List>
        <ListItem button onClick={() => handleClick('items')}> 
          <ListItemText primary="Get Item" />
        </ListItem>
        <ListItem button onClick={() => handleClick('quality')}>
          <ListItemText primary="Get Quality" />
        </ListItem>
      </List>
    </div>
  );
}

export default Toc;
