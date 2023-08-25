import React, { useState } from 'react';
import { CalendarPicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';



export default function CalendarOutput() {
 
  dayjs.extend(utc);
  dayjs.extend(advancedFormat);



  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <DatePicker
          label="Date picker"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
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

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                  <CalendarPicker
    date={dayjs()}
    onChange={() => {}}

                  />
      </div>
    </LocalizationProvider>
  );
}
