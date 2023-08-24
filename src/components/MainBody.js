// MainBody.js
import React, { useContext, useEffect, useState } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormOutput from './FormOutput';
import FileOutput from './FileOutput';
import UrlOutput from './UrlOutput';

function MainBody({ onSelect }) {

  const isXS = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const {
    outputPage, setOutputPage
  } = useContext(AppContext);

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  console.log('Mainbody.js.line 13:outputPage',outputPage )

    return (
      <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
        {outputPage === 'FormOutput' && <FormOutput />}
        {outputPage === 'FileOutput' && <FileOutput />}
        {outputPage === 'UrlOutput' && <UrlOutput />}
      </div>
    );
}

export default MainBody;
