import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import React from 'react';


export const Layout = (props) => {
  const { children } = props;

  return (
    <Box component="main" sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', height: '100vh'}}>
        <Grid container sx={{ flex: '1 1 auto' }}>
              <Grid id="left" xs={12} lg={6} 
                    sx={{ backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column',
                          position: 'relative', height: '100vh', paddingTop: '40px', paddingBottom: '20px' }}> 
                  <Box component="header" sx={{ left: 0, p: 3, position: 'fixed', top: 0, width: '100%'}}>
                    <Box component={NextLink} href="/" sx={{ display: 'inline-flex', height: 32, width: 32}}></Box>
                  </Box>    
                  {children}
              </Grid>
  
              <Grid id="right" xs={false} lg={6}
                  sx={{ alignItems: 'center', background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
                        color: 'white', display: { xs: 'none', lg: 'flex' }, justifyContent: 'center', overflow: 'hidden',
                        paddingTop: '20px' }}> 
                  <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center">
                    <img alt="" src="/assets/splash.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
            </Grid>
          </Grid>
      </Box>
  );
  
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
