import React,{useContext} from 'react';
import AppContext from 'src/contexts/ArenaContext';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'; // If you are using MUI


function navigateBack() {
  const {setShowMainBody, setPopulateMainBody, setPopulateSideNav, setPopulateListNav, setShowListNav, setShowSideNav } = useContext(AppContext);
  const { showSettingsNav, setShowSettingsNav } = useContext(AppContext); // Get the setShowSettingsNav function from the context

  setShowSideNav(false);
  setPopulateSideNav(false);

  setShowListNav(true);
  setPopulateListNav(true);

  setShowMainBody(false);
  setPopulateMainBody(false);

}

function MenuMainBodyNav() {
  const theme = useTheme(); // Get the current theme

  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <IconButton aria-label="go back" onClick={navigateBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        color={theme.palette.mode === 'dark' ? 'white' : 'black'} // Use white color if dark mode, black otherwise

      >
        Back to List
      </Typography>
    </Box>
  );
}

export default MenuMainBodyNav;
