import React, { useContext, useState, useEffect } from 'react';
import {Typography, Box } from '@mui/material';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';
import Grid from '@mui/material/Grid';
import { AppBar, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {  Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AttributesRenderer } from './formRenderers';

export default function FormOutput() {
  const { selectedItemWorld, selectedGUID, arenaSessionId, qualityProcessTemplates, qualityProcessStepAttributes } = useContext(AppContext);
  const arenaEndPoint = selectedItemWorld?.arenaEndPoint;

  const [header, setHeader] = useState(null);
  const [steps, setSteps] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const theme = useTheme();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const [formState, setFormState] = useState({});

  const handleInputChange = (event, apiName) => {
    const newValue = event.target.value;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [apiName]: newValue,
    }));
  };
  

  const handleFormSubmit = async () => {
    try {
      const requestBody = {
        attributes: Object.entries(formState).map(([apiName, value]) => ({
          guid: apiName, // Use the apiName as the guid
          value: value || '', // Use the user input value or an empty string
        })),
      };
  
      console.log('Form data to be submitted:', requestBody);
      const endpoint = `/api/arenaput?endpoint=qualityprocesses/${selectedGUID}/steps/7P9SXLCHYUD9SBU4UAC8`;
    
  
      const response = await axios.put(
        endpoint,
        requestBody,
        {
          headers: {
            'arena-session-id': arenaSessionId,
          },
        }
      );
  
      // Handle success response if needed
      console.log('Form data updated:', response.data);
    } catch (error) {
      // Handle error if needed
      console.error('Error updating form data:', error);
    }
  };
  
  


  const handleValueChange = (event, attribute) => {
    if (!isEditMode) return;
    
    const newValue = event.target.value;
    setSteps(prevSteps => {
      const newResults = prevSteps.results.map(result => {
        const newAttributes = result.attributes.map(attr => {
          if (attr.apiName === attribute.apiName) {
            return { ...attr, value: newValue };
          }
          return attr;
        });
        return { ...result, attributes: newAttributes };
      });
      return { ...prevSteps, results: newResults };
    });
  };
    
    useEffect(() => {
      if (selectedGUID && arenaEndPoint) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/arenagetGUID?endpoint=${arenaEndPoint}&guid=${selectedGUID}`, {
              headers: { 'arena-session-id': arenaSessionId },
            });
            setHeader(response.data);
    
            const templateGUID = response.data.template.guid;
    
            // Find the exact template from qualityProcessTemplates
            const exactTemplate = qualityProcessTemplates.results.find(result => result.guid === templateGUID);
    
            setTemplateData(exactTemplate);
            console.log("templateData", templateData); // Add this line to check templateData


            console.log("formatoutout.js:line 67:response.exactTemplate", exactTemplate)

            const stepsResponse = await axios.get(`/api/arenagetGUID?endpoint=${arenaEndPoint}&guid=${selectedGUID}/steps?includeEmptyAdditionalAttributes=true`, {
              headers: { 'arena-session-id': arenaSessionId },
            });
            setSteps(stepsResponse.data);
            console.log("stepsResponse", stepsResponse); // Add this line to check stepsResponse
   
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }
    }, [selectedGUID, arenaEndPoint, arenaSessionId]);
    
      const renderHeader = () => {
        if (!header) {
          return null;
        }
      
        const { number, name, owner, creationDateTime, status } = header;
      
        return (
          <AppBar position="static" style={{ backgroundColor: '#dae3e9' }}>
            <Grid container alignItems="center">

              <Grid item xs={10} sm={11} md={11}>
                <Grid container>
                  <Grid item xs={4} sm={4} md={4}>
                    <Typography style={{ color: '#000000' }} variant="body2">{number || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <Typography style={{ color: '#000000' }} variant="body2">
                      {creationDateTime
                        ? new Date(creationDateTime).toISOString().split('T')[0]
                        : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <Typography style={{ color: '#000000' }} variant="body2">{status || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography style={{ color: '#000000' }} variant="body2">{name || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography style={{ color: '#000000' }} variant="body2">
                      {owner ? (
                        <a href={`mailto:${owner.email}`} style={{ color: '#000000' }}>
                          {owner.fullName}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        );
      };
  

      const renderSteps = (stepsResults) => (
        <Box>
          {stepsResults.map((step, index) => {
            const fullName =
              step.assignees && step.assignees.users && step.assignees.users.length > 0
                ? step.assignees.users[0].fullName
                : null;
      
                    // Find the corresponding template attributes for this step
                    console.log("stepsResponse", step.name); // Add this line to check stepsResponse
            // Find the corresponding template attributes for this step's name
          // Find the corresponding template step for this step's name
        const templateStep = templateData?.steps.find(templateStep => templateStep.name === step.name);



            return (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#dae3e9' }}>
                  <Grid container>
                    <Grid item xs={2} sm={1} md={1}>
                    </Grid>
                    <Grid item xs={10} sm={11} md={11}>
                      <Grid container>
                        <Grid item xs={6} sm={4} md={4}>
                          <Typography style={{ color: '#000000' }} variant="body2">{step.name || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                          <Typography style={{ color: '#000000' }} variant="body2">
                            {step.dueDateTime
                              ? new Date(step.dueDateTime).toISOString().split('T')[0]
                              : 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                          <Typography style={{ color: '#000000' }} variant="body2">
                            {fullName ? (
                              <a href={`mailto:${step.assignees.users[0].email}`} style={{ color: '#000000' }}>
                                {fullName}
                              </a>
                            ) : (
                              'N/A'
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                          <Typography style={{ color: '#000000' }} variant="body2">{step.status || 'N/A'}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionSummary>
    

                <AccordionDetails>
  
                <AttributesRenderer
                  attributes={step.attributes || []}
                  templateAttributes={templateStep?.attributes || []}
                  isEditMode={isEditMode}
                  additionalAttributes={qualityProcessStepAttributes.results || []}
                  formState={formState}           // Pass the formState here
                  handleInputChange={handleInputChange} // Pass the handleInputChange function here
/>

                </AccordionDetails>
              </Accordion>
                    
            );
          })}
        </Box>
      );
      

      const renderResults = () => {
        if (!steps || !steps.results) {
          return null;
        }
      
        return (
          <Box>
            {renderSteps(steps.results, isEditMode)}
          </Box>
        );
      };
  
  

  return (
    <div>
     <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ marginRight: '16px' }}>
              Edit Mode
            </Typography>
            <Switch checked={isEditMode} onChange={handleToggleEditMode} />
          </div>
          {isEditMode && (
  <Button
    variant="contained"
    color="primary"
    style={{ backgroundColor: 'green', color: 'white' }}
    onClick={() => handleFormSubmit()} // Call the function by adding parentheses

  >
    Submit
  </Button>
)}
        </Toolbar>
      </AppBar>

      {header && (
        <Box>
          {renderHeader()}
        </Box>
      )}
      <Box>
        {renderResults(isEditMode)}
      </Box>

    </div>
  );
}
  
