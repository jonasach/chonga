import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import useSession from 'src/hooks/useSession';
import { menuItems } from './menuConfig';
import { useTheme } from '@mui/material/styles';


function ListNav({ onSelect }) { // Added onSelect prop here
  const arenaSessionId = useSession(); // Using the custom hook
  const theme = useTheme();
  const [data, setData] = useState(null);
  const {arenaEndPoint, arenaListName, arenaListNumber, setSelectedGUID } = useContext(AppContext);


    // Determine text and background color based on theme
    const textColor = theme.palette.text.primary;
    const backgroundColor = theme.palette.background.paper;

  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${arenaEndPoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint]);

  const handleItemClick = (guid) => {
    setSelectedGUID(guid); 
    onSelect(); // Added this line to trigger the MainBody to show
  };

  return (
    <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
      {data ? (
        <List>
          {data.results.map((item, index) => (
            <div key={item.guid}>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick(item.guid)}>
                  <ListItemText
                    primary={<span>Number: {item[arenaListName]}</span>}
                    secondary={`Name: ${item[arenaListNumber]}`}
         />
                       <div style={{ color: textColor }}>{" > "}</div> 
                </ListItemButton>
              </ListItem>

              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <div>Loading some list data...</div>
      )}
    </div>
  );
}

export default ListNav;
