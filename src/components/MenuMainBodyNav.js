import React from 'react';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

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

function MenuMainBodyNav({ onBackArrowClick }) { // Pass the onBackArrowClick function as a prop
  return (
    <>
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
        Back to List
      </Typography>

    </>
  );
}

export default MenuMainBodyNav;
