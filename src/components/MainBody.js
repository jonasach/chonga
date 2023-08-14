    import { useContext, useEffect, useState } from 'react';
    import axios from 'axios';
    import AppContext from 'src/contexts/ArenaContext';
    import { useTheme } from '@mui/material/styles';
    import { Button, TextField, FormControl } from '@mui/material';
    import { Switch, FormControlLabel } from '@mui/material';
    import { Hidden, Container, Grid, Divider, IconButton } from '@mui/material';
    import useMediaQuery from '@mui/material/useMediaQuery'; // If you are using MUI
    import useSession from 'src/hooks/useSession';
    
    function MainBody({  onSelect }) {
      const isXS = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
      const theme = useTheme();
      const [data, setData] = useState(null);

      const {
        setSelectedGUID, selectedGUID,
        setArenaListName,arenaListName,
        setArenaListNumber,arenaListNumber,
        setSelectedPage,selectedPage,
        setArenaEndPoint, arenaEndPoint,
        showSideNav, setShowSideNav ,
        showListNav, setShowListNav ,
        showMainBody, setShowMainBody,
        showSettingsNav, setShowSettingsNav, 
        populateSideNav, setPopulateSideNav ,
        populateListNav, setPopulateListNav ,
      } = useContext(AppContext);

      const arenaSessionId = useSession();

      const textColor = theme.palette.text.primary;
      const backgroundColor = theme.palette.background.paper;

      const [isEditMode, setIsEditMode] = useState(false);

      // You may need to implement a function to handle changes to these fields
      const handleValueChange = (field, value) => {
        // Your logic here yoeman 
      };

      const renderField = (key, value, readOnly = false, isChild = false) => {
        if (typeof value === 'object' && value !== null) {
          if (!isChild && key.toLowerCase().includes('guid')) {
            return null;
          }
      
          return (
            <div key={key}>
              <div>{key}</div>
              {Object.keys(value).map((childKey) =>
                renderField(childKey, value[childKey], true, key.toLowerCase().includes('guid'))
              )}
            </div>
          );
        }
      
        if (value === true || value === false) {
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={() => handleValueChange(key, !value)}
                  color="primary"
                />
              }
              label={key}
              key={key}
              style={{ borderBottom: `2px solid white` }}
            />
          );
        }
        if (value === true || value === false) {
          return (
            <FormControlLabel
              control={
                <Switch
                  checked={value}
                  onChange={() => handleValueChange(key, !value)}
                  color="primary"
                />
              }
              label={key}
              key={key} // Added key here
            />
          );
        }
      
        if (typeof value === 'string' && value.startsWith('https')) {
          return (
            <div key={key}>
              <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                {key}
              </a>
              <br />
            </div>
          );
        }
      
        if (key.includes('Date') && typeof value === 'string') {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString(); // Change this to format as you prefer
          return (
            <FormControl fullWidth key={key}>
              <TextField
                label={key}
                value={formattedDate}
                variant="filled"
                InputLabelProps={{
                  style: {
                    color: readOnly || !isEditMode ? textColor : 'white',
                  },
                }}
                InputProps={{
                  readOnly: readOnly || !isEditMode,
                  style: {
                    color: readOnly || !isEditMode ? textColor : 'white',
                    backgroundColor: readOnly || !isEditMode ? 'transparent' : 'blue',
                  },
                }}
              />
            </FormControl>
          );
        }
      
        if (key.includes('email') && typeof value === 'string') {
          return (
            <FormControl fullWidth key={key}>
              <a href={`mailto:${value}`} style={{ color: 'white' }}>
                {key}
              </a>
            </FormControl>
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
                  color: readOnly || !isEditMode ? textColor : 'white',
                },
              }}
              InputProps={{
                readOnly: readOnly || !isEditMode,
                style: {
                  color: readOnly || !isEditMode ? textColor : 'white',
                  backgroundColor: readOnly || !isEditMode ? 'transparent' : 'blue',
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
      }, [selectedGUID]); // Empty dependency array means this effect will run once after the initial render



      return (
        <div style={{ backgroundColor: backgroundColor, height: '100%', color: textColor }}>
          {data ? (
            <form style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingLeft: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              </div>
              {/* Use Grid for a 2-column layout */}
              <Grid container spacing={2}>
                    {Object.keys(data).map((key) => {
            

                    return (
                        <Grid item xs={12} sm={6} key={key}>
                          {renderField(key, data[key])}
                        </Grid>
                      );
                    })}
                  </Grid>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      );



    }

    export default MainBody;
