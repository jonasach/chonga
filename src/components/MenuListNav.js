import React from 'react';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

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

function MenuListNav({ toggleListNav, onBackArrowClick }) { 
  const theme = useTheme();
  
  return (
    <>
          <Typography
        variant="h6"
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Back to Menu
      </Typography>

      <IconButton
        aria-label="go back"
        onClick={onBackArrowClick} // Connect the click handler
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
    </>
  );
}

export default MenuListNav;
