import React, { useState } from 'react';
import { Grid, Container, Hidden, Divider } from '@mui/material';

function MainLayout({ children, ListNavComponent, mainBodyContent, showSidebar, isListNavOpen }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header toggleMenu={toggleSidebar} style={{ backgroundColor: 'mediumseagreen' }} />

      <Grid container style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'hidden' }}>

        {showSidebar && (
          <Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
            <Container style={{ padding: '0px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
              <Toc />
            </Container>
            <Divider orientation="vertical" />
          </Grid>
        )}

        {isListNavOpen && (
          <Hidden only={['xs']}>
            <Grid item xs={2} style={{ backgroundColor: 'white', overflowY: 'auto' }}>
              <Container style={{ padding: '0px', backgroundColor: 'white', flex: 1, overflowY: 'auto' }}>
                {ListNavComponent ? <ListNavComponent /> : children}
              </Container>
              <Divider orientation="vertical" />
            </Grid>
          </Hidden>
        )}

        <Grid item xs={showSidebar && isListNavOpen ? 8 : 10} style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <Container style={{ backgroundColor: '#f0f0f0', padding: '0px' }}>
            {mainBodyContent()}
          </Container>
        </Grid>

      </Grid>

      <Footer style={{ backgroundColor: 'dimgray', color: 'white', position: 'fixed', bottom: 0, left: 0, right: 0 }} />

    </div>
  );
}

export default MainLayout;
