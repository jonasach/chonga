import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import FormOutput from 'src/components/outputmode/FormOutput';
import FileOutput from 'src/components/outputmode/FileOutput';
import UrlOutput from 'src/components/outputmode/UrlOutput';
import CalendarOutput from 'src/components/outputmode/CalendarOutput';
import RawOutput from 'src/components/outputmode/RawOutput';
import FormOutputDefault from 'src/components/outputmode/FormOutputDefault';

const outputPages = {
  FormOutput,
  FileOutput,
  UrlOutput,
  CalendarOutput,
  RawOutput,
  FormOutputDefault
};

function MainBody() {
  const theme = useTheme();
  const { selectedItemWorld } = useContext(AppContext);

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  const outputPage = selectedItemWorld?.outputPage;
  const OutputComponent = outputPages[outputPage];

  console.log("MainBody.js:line 28:outputPage", outputPage)
  console.log("MainBody.js:line 28:OutputComponent", OutputComponent)

  return (
    <div style={{ backgroundColor, height: '100%', color: textColor }}>
      {OutputComponent && <OutputComponent />}
    </div>
  );
}

export default MainBody;
