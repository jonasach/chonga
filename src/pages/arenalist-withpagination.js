import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import AppContext from 'src/contexts/ArenaContext';

import React  from 'react';


function Items({itemsPerPage = 7}) {
  console.log("a.start")
  const router = useRouter();
  const [data, setData] = useState(null);
  const { arenaSessionId, arenaEndPoint,arenaListName, arenaListNumber } = useContext(AppContext);


  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = data ? Math.ceil(data.results.length / itemsPerPage) : 0;

  // Determine the items for the current page
  const currentItems = data ? data.results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Ignore out-of-bounds
    setCurrentPage(newPage);
  };


  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenaget?endpoint=${arenaEndPoint}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          console.log("arenalist1.js.data:", response.data)
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint]); 

  return (
    <div>
      {data ? (
        <>
          <List>
            {currentItems.map((item, index) => (
              <div key={item.guid}>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      primary={<span style={{ color: '#3f51b5' }}> Number: {item[arenaListName]}</span>}
                      secondary={`Name: ${item[arenaListNumber]}`}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <div>
            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
            <span>{currentPage} / {totalPages}</span>
            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
          </div>
        </>
      ) : (
        <div>Loading some data...</div>
      )}
    </div>
  );
}

export default Items;
