import React, { useContext } from 'react'; // Don't forget to import useContext
import { Container, Typography } from '@mui/material';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';

const footerStyle = {
  height: '50px', 
  padding: '20px', 
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'dimgray',
  color: 'white',
  padding: '8px 0',
};

function Footer() {
  const theme = useTheme();
  
  const { selectedGUID, arenaSessionId } = useContext(AppContext); // Extract selectedGUID from the context

  return (
    <Container style={footerStyle} maxWidth="none">
            <Typography variant="body2">{arenaSessionId}</Typography>
      <Typography variant="body2">{selectedGUID}</Typography>
    </Container>
  );
}

export default Footer;
