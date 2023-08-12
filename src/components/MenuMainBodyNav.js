import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MenuMainBodyNav({ onBackArrowClick, onEditModeChange, isEditMode }) {
  return (
    <>
      <IconButton aria-label="go back" onClick={onBackArrowClick}>
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
