import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from 'src/contexts/ArenaContext';
import { useTheme } from '@mui/material/styles';
import { Button, TextField, FormControl } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';

function MainBody({  onSelect }) {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const { selectedGUID, arenaSessionId, arenaEndPoint, setSelectedGUID } = useContext(AppContext);

  const textColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.paper;

  const [isEditMode, setIsEditMode] = useState(false);

  // You may need to implement a function to handle changes to these fields
  const handleValueChange = (field, value) => {
    // Your logic here yoeman 
  };

  const renderField = (key, value, readOnly = false) => { // Added the readOnly parameter, default to false
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key}>
          <div>{key}</div>
          {Object.keys(value).map((childKey) => renderField(childKey, value[childKey], true))} {/* Set readOnly to true for children */}
        </div>
      );
    }
  
    return (
      <FormControl fullWidth key={key}>
        <TextField
          label={key}
          value={value}
          onChange={readOnly ? undefined : (e) => handleValueChange(key, e.target.value)}
          variant="filled"
          InputLabelProps={{
            style: {
              color: readOnly || !isEditMode ? textColor : 'white', // Set label color to black when editable
            },
          }}
          InputProps={{
            readOnly: readOnly || !isEditMode,
            style: {
              color: readOnly || !isEditMode ? textColor : 'white', // Set text color to black when editable
              backgroundColor: readOnly || !isEditMode ? 'transparent' : 'blue', // Set to plain blue when editable
            },
          }}
        />
      </FormControl>
    );
  };
  
 

  useEffect(() => {
    if (arenaSessionId && arenaEndPoint) {
      const fetchData = async () => {
        try {
          console.log('MainBody.selectedGUID', selectedGUID);
          const response = await axios.get(`/api/arenagetGUID?endpoint=${arenaEndPoint}&guid=${selectedGUID}`, {
            headers: { 'arena-session-id': arenaSessionId },
          });
          setData(response.data);
          console.log('MainBody.response.data', response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [arenaSessionId, arenaEndPoint, selectedGUID]);

  return (
    <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
      {data ? (
        <form>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Flex container for alignment */}
            <FormControlLabel
              control={
                <Switch
                  checked={isEditMode}
                  onChange={() => setIsEditMode(!isEditMode)}
                  color="primary"
                />
              }
              label={isEditMode ? 'Edit Mode' : 'View Mode'}
            />
          </div>        {Object.keys(data).map((key) => renderField(key, data[key]))}
  
        </form>
      ) : (
        <div>Loading some list data...</div>
      )}
    </div>
  );
}

export default MainBody;
