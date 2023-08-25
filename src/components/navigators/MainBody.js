// MainBody.js
import React, { useContext, useEffect, useState } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormOutput from 'src/components/outputmode/FormOutput';
import FileOutput from 'src/components/outputmode/FileOutput';
import UrlOutput from 'src/components/outputmode/UrlOutput';
import CalendarOutput from 'src/components/outputmode/CalendarOutput';

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
        {outputPage === 'CalendarOutput' && <CalendarOutput />}
        {outputPage === 'RawOutput' && <RawOutput />}
      </div>
    );
}

export default MainBody;
