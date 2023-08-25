// MainBody.js
import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import FormOutput from 'src/components/outputmode/FormOutput';
import FileOutput from 'src/components/outputmode/FileOutput';
import UrlOutput from 'src/components/outputmode/UrlOutput';
import CalendarOutput from 'src/components/outputmode/CalendarOutput';
import RawOutput from 'src/components/outputmode/RawOutput';

function MainBody() {

  const theme = useTheme();

  const {
    outputPage
  } = useContext(AppContext);

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;
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
