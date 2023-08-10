import { Container, Typography } from '@mui/material';

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'dimgray',
  color: 'white',
  padding: '8px 0',
};

function Footer() {
  return (
    <Container style={footerStyle} maxWidth="none">
      <Typography variant="body2">© PTC 2023 - FTLPD Team 5</Typography>
    </Container>
  );
}

export default Footer;
