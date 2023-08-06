import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import ContentArea from '../components/ContentArea'; // Ensure the filename matches
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function Toc() { // Consider renaming to Toc
  const router = useRouter();
  const { sessionId, page } = router.query;
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (page) {
      const DynamicComponent = dynamic(() => import(`../components/${page}`));
      setComponent(<DynamicComponent sessionId={sessionId} />);
    }
  }, [page, sessionId]);

  const handleItemClick = (route, pageName) => {
    router.push({
      pathname: route,
      query: { sessionId, page: pageName }
    });
  };

  return (
    <div>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button onClick={() => handleItemClick('/path/to/page', 'Items')}> 
            <ListItemText primary="Get Item" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('/path/to/page', 'Quality')}>
            <ListItemText primary="Get Quality" />
          </ListItem>
        </List>
      </Drawer>
      <Container>
        <ContentArea>{Component}</ContentArea>
      </Container>
    </div>
  );
}

export default Toc;
