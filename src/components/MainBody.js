import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import { FormControl, TextField } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import useSession from 'src/hooks/useSession';
import Grid from '@mui/material/Grid';
import columnConfig from '../../config/columns.json'; // Adjust the path accordingly
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'; // Import Button from MUI
import { Document, Page, pdfjs } from 'react-pdf';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


// The workerSrc property shall be specified.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function MainBody({ onSelect }) {
  const isXS = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [data, setData] = useState(null);

  const {
    selectedGUID,
    arenaEndPoint, selectedPage
  } = useContext(AppContext);

  const arenaSessionId = useSession();

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  const [isEditMode, setIsEditMode] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const scaleFactor = 0.6;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };




// if we are getting a file
useEffect(() => {


  if (selectedPage === 'externalLink') {
    // Do nothing here if selectedPage is 'externalLink'
    console.log('MainBody.js:selectedPage', selectedPage)
    console.log('MainBody.js:arenaEndPoint', arenaEndPoint)

    return;
  }


  if (selectedGUID && arenaEndPoint && arenaEndPoint !== 'files?format=pdf') {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/arenagetGUID?endpoint=${arenaEndPoint}&guid=${selectedGUID}`, {
          headers: { 'arena-session-id': arenaSessionId },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  } else if (selectedGUID && arenaEndPoint === 'files?format=pdf') {
      console.log('MainBody.js:selectedGUID:line67', selectedGUID)
   
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/arenafilecontent?guid=${selectedGUID}`, {
            headers: { 'arena-session-id': arenaSessionId },
            responseType: 'arraybuffer',
          });
          console.log('MainBody.js:selectedGUID:response.data', response.data)
          setPdfData(new Blob([response.data], { type: 'application/pdf' }));
        } catch (error) {
          console.error('Error fetching PDF data:', error);
        }
      };  
      fetchData();
  }
}, [selectedGUID, arenaEndPoint, selectedPage]);



const handleValueChange = (event) => {
    // Handle changes to the field value
  };

  const columns = columnConfig[arenaEndPoint] || [];

  return (
    <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
      {selectedPage !== 'externalLink'  && arenaEndPoint !== 'files?format=pdf' && selectedGUID && (
        <div style={{ backgroundColor: '#222', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={isEditMode}
                onChange={() => setIsEditMode(!isEditMode)}
                color="primary"
              />
            }
            label={isEditMode ? 'Edit Mode' : 'View Mode'}
            style={{ color: 'white' }}
          />
          {isEditMode && (
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'green', color: 'white' }}
              onClick={() => {}}
            >
              Submit
            </Button>
          )}
        </div>
      )}
      <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
        {selectedGUID && (
          <div>
            {arenaEndPoint !== 'files?format=pdf' ? (
              data ? (
                <form style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingLeft: '16px' }}>
                  <Grid container>
                    {columns.map(column => (
                      <Grid item xs={12} sm={12} key={column.name}>
                        <div style={{ paddingBottom: '16px' }}>
                          <div>{column.label}</div>
                          {isEditMode ? (
                            <FormControl style={{ width: '100%' }}>
                              <TextField
                                label={column.label}
                                value={data[column.name]}
                                onChange={handleValueChange}
                                variant="filled"
                                disabled={!isEditMode || !column.editable}
                                style={{
                                  width: isEditMode ? '100%' : 'auto',
                                  backgroundColor: column.editable ? '#007bff' : 'transparent',
                                  color: isEditMode ? '#fff' : textColor,
                                }}
                              />
                            </FormControl>
                          ) : (
                            <div>{data[column.name]}</div>
                          )}
                        </div>
                        <Divider />
                      </Grid>
                    ))}
                  </Grid>
                </form>
              ) : (
                <></>
              )
            ) : (
              <div style={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}>
                {pdfData ? (
                  <Document 
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page 
                        key={`page_${index + 1}`} 
                        pageNumber={index + 1} 
                        width={window.innerWidth * scaleFactor}
                      />
                    ))}
                  </Document>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        )}
        {/* Render an iframe if arenaEndPoint is an external link */}
        {selectedPage === 'externalLink' && arenaEndPoint && arenaEndPoint !== 'files?format=pdf' && (
          <iframe frameborder="0" src="https://arenasolutions.na.gooddata.com/dashboard.html#workspace=/gdc/workspaces/qy77hw96y43e7f55o8dkj8rzwyoggan3&dashboard=/gdc/md/qy77hw96y43e7f55o8dkj8rzwyoggan3/obj/213880" width="100%" height="950px" allowTransparency="false"></iframe>
        )}
      </div>
    </div>
  );
        };
export default MainBody;
