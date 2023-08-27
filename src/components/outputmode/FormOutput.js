import React, { useContext, useState, useEffect } from 'react';
import {Typography, Box } from '@mui/material';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';
import Grid from '@mui/material/Grid';
import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {  Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { renderAttributes } from './formRenderers';

export default function FormOutput() {
  const { selectedItemWorld, selectedGUID, arenaSessionId, qualityProcessTemplates, qualityProcessStepAttributes } = useContext(AppContext);
  const arenaEndPoint = selectedItemWorld?.arenaEndPoint;

  const [header, setHeader] = useState(null);
  const [steps, setSteps] = useState(null);
  const [setTemplateData] = useState(null);

  
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
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
  
          const stepsResponse = await axios.get(`/api/arenagetGUID?endpoint=${arenaEndPoint}&guid=${selectedGUID}/steps`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setSteps(stepsResponse.data);
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
      <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
        <Grid container>
        <Avatar alt="Joe Erickson" src="/assets/images/avatar/1.jpg" />
          <Grid item xs={2}><Typography variant="body2">{number || 'N/A'}</Typography></Grid>
          <Grid item xs={2}><Typography variant="body2">{name || 'N/A'}</Typography></Grid>
          <Grid item xs={2}><Typography variant="body2">
            {owner ? <a href={`mailto:${owner.email}`} style={{ color: '#cccccc' }}>{owner.fullName}</a> : 'N/A'}
          </Typography></Grid>
          <Grid item xs={2}><Typography variant="body2">{creationDateTime ? new Date(creationDateTime).toISOString().split('T')[0] : 'N/A'}</Typography></Grid>
          <Grid item xs={2}><Typography variant="body2">{status || 'N/A'}</Typography></Grid>
        </Grid>
      </AppBar>
    ); 
  };

  const renderSteps = (stepsResults) => (
    <Box>
      {stepsResults.map((step, index) => {
        const fullName = step.assignees && step.assignees.users && step.assignees.users.length > 0 ? step.assignees.users[0].fullName : null;
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#808080' }}>
              <Grid container>
                <Grid item xs={1}>
                  {fullName === 'Joseph Erickson' && <Avatar alt="Joseph Erickson" src="/assets/images/avatar/1.jpg" />}
                </Grid>
                <Grid item xs={2}><Typography variant="body2">{step.order || 'N/A'}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2">{step.name || 'N/A'}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2">{fullName ? <a href={`mailto:${step.assignees.users[0].email}`} style={{ color: '#cccccc' }}>{fullName}</a> : 'N/A'}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2">{step.dueDateTime ? new Date(step.dueDateTime).toISOString().split('T')[0] : 'N/A'}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2">{step.status || 'N/A'}</Typography></Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
                {step.attributes && renderAttributes(step.attributes, isEditMode)}
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
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit Mode
          </Typography>
   
          <Switch checked={isEditMode} onChange={handleToggleEditMode} />
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
