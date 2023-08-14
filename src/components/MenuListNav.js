import React,{useContext} from 'react';
import AppContext from 'src/contexts/ArenaContext';

import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box'; // Import Box
import ListItem from '@mui/material/ListItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Search = styled('div')({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: '#f0f0f0',
  marginLeft: '8px',
  width: 'auto',
});

const SearchIconWrapper = styled('div')({
  padding: '8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledInputBase = styled(InputBase)({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 32px',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  },
});

function navigateBack() {
  const {setShowMainBody, setPopulateMainBody, setPopulateSideNav, setPopulateListNav, setShowListNav, setShowSideNav } = useContext(AppContext);

  setShowSideNav(false);
  setPopulateSideNav(false);

  setShowListNav(true);
  setPopulateListNav(true);

  setShowMainBody(false);
  setPopulateMainBody(false);

}

function MenuListNav({ toggleListNav }) {

  const { showSettingsNav, setShowSettingsNav } = useContext(AppContext); 

  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Typography
        variant="h6"
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Back to Menu
      </Typography>
      <IconButton
        aria-label="go back"
        onClick={navigateBack()}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Search
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <IconButton
        aria-label="toggle list navigation"
        color="inherit"
        onClick={toggleListNav}
      >
        <MoreIcon />
      </IconButton>
         {/* Add a switch to toggle showSettingsNav */}
         <div>
        <ListItem>
          <FormControlLabel
             control={<Switch checked={showSettingsNav} onChange={() => setShowSettingsNav(!showSettingsNav)} />}
            label="Settings"
          />
        </ListItem>
        </div>
    </Box>
  );
}

export default MenuListNav;
