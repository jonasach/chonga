import React, { useContext, useState, useEffect } from 'react';
import { FormControl, TextField, Grid, Divider } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';
import columnConfig from '../../../config/columns.json'; // Adjust the path accordingly
import Button from '@mui/material/Button'; // Import Button from MUI


export default function FormOutput() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  

  const { selectedItemWorld, selectedGUID, arenaSessionId } = useContext(AppContext);
  const arenaEndPoint = selectedItemWorld?.arenaEndPoint;

  const textColor = theme.palette.text.primary;


  const backgroundColor = theme.palette.background.paper;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleValueChange = () => {
    // Placeholder for handling field value changes
    // Update this function as needed
  };


    const columns = columnConfig[arenaEndPoint] || [];

    // if we are getting a files
    useEffect(() => {
      if (selectedGUID && arenaEndPoint) {
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
      }
    }, [selectedGUID, arenaEndPoint, arenaSessionId]);
  

    return (
      <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>

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

        {selectedGUID && data && (
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
                          multiline={column.multiline}
                          rows={column.multiline ? 3 : 1}
                          style={{
                            width: isEditMode ? '100%' : 'auto',
                            backgroundColor: column.editable ? '#007bff' : 'transparent',
                            color: isEditMode ? '#fff' : textColor,
                          }}
                        />
                      </FormControl>
                    ) : (
                      <div>{data && data[column.name]}</div>  
                    )}
                  </div>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </form>
        )}
  </div>
  );
  
}


