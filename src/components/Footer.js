import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';

/**
 * Footer component
 *
 * This component renders a fixed footer bar at the bottom of the page.
 * It displays the current arena session ID and selected GUID.
 * The footer's appearance adapts to the current theme (dark or light mode),
 * and its content is centered both vertically and horizontally.
 */
function Footer() {
  // Accessing the current theme to adapt the footer's appearance
  const theme = useTheme();

  // Accessing relevant context values
  const { selectedGUID, arenaSessionId } = useContext(AppContext);

  // Styling for the footer container
  const footerStyle = {
    height: '30px',
    padding: '8px 20px', // Vertical padding of 8px, horizontal padding of 20px
    position: 'fixed', // Fixed position ensures the footer sticks to the bottom
    bottom: 0,
    width: '100%', // Full-width footer
    backgroundColor: theme.palette.mode === 'dark' ? 'dimgray' : 'lightgray', // Background color adapts to theme mode
    color: theme.palette.text.primary, // Text color adapts to theme mode
    display: 'flex', // Enable flex layout to align content
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Spread items out horizontally
  };

  return (
    <Container style={footerStyle} maxWidth="none">
      <Typography variant="body2">{arenaSessionId}</Typography> {/* Arena Session ID */}
      <Typography variant="body2">{selectedGUID}</Typography> {/* Selected GUID */}
    </Container>
  );
}

export default Footer;
