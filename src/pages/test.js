import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

function TestLayout() {
  const isXS = useMediaQuery('(max-width:600px)');
  const isSM = useMediaQuery('(min-width:601px) and (max-width:768px)');
  const isLG = useMediaQuery('(min-width:1201px)'); // Added this
  const isXL = useMediaQuery('(min-width:1600px)'); // Added this for XL screens

  const layoutStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const headerStyles = {
    padding: '20px',
    backgroundColor: '#3F51B5', // Header background color
    color: 'white',
    textAlign: 'center',
  };

  const sectionStyles = {
    padding: '20px',
    marginBottom: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
    textAlign: 'center',
  };

  const navStyles = {
    ...sectionStyles,
    width: isLG || isXL ? '300px' : '100%', // Adjust width based on screen size
    backgroundColor: '#FFEB3B', // Nav background color
  };

  const detailStyles = {
    ...sectionStyles,
    backgroundColor: '#4CAF50', // Detail background color
    flex: 1,
  };

  const footerStyles = {
    padding: '20px',
    backgroundColor: '#9C27B0', // Footer background color
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div style={layoutStyles}>
      <div style={headerStyles}>Header</div>

      <div style={{ display: 'flex' }}>
        {!isXS && <div style={navStyles}>Nav1</div>}
        {!isXS && <div style={navStyles}>Nav2</div>} 
        <div style={detailStyles}>Detail</div>
      </div>

      <div style={footerStyles}>Footer</div>
    </div>
  );
}

export default TestLayout;
