import React from 'react';
import { TextField, Select, MenuItem, Box } from '@mui/material';
import { DatePicker } from '@mui/lab';

export const renderTextField = (attribute, index, isEditMode) => (
  <TextField
    key={index}
    label={attribute.name || 'N/A'}
    defaultValue={attribute.value || 'N/A'}
    variant="outlined"
    fullWidth
    rowax={4}
    margin="normal"
    disabled={!isEditMode}
    InputLabelProps={{
      shrink: true,
    }}
  />
);

export const renderSingleTextField = (attribute, index, isEditMode) => {
  return (
    <TextField
      key={index}
      label={attribute.name || 'N/A'}
      defaultValue={attribute.value || 'N/A'}
      variant="outlined"
      fullWidth
      rowax={4}
      margin="normal"
      disabled={!isEditMode}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export const renderMultiTextField = (attribute, index, isEditMode) => {
  return (
    <TextField
      key={index}
      label={attribute.name || 'N/A'}
      defaultValue={attribute.value || 'N/A'}
      variant="outlined"
      fullWidth
      rowax={4}
      margin="normal"
      disabled={!isEditMode}
      multiline
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export const renderDropDown = (attribute, index, isEditMode) => (
  <Select
    key={index}
    label={attribute.name || 'N/A'}
    value={attribute.value || 'N/A'}
    fullWidth
    variant="outlined"
    margin="normal"
    disabled={!isEditMode}
  >
    <MenuItem value={attribute.value || 'N/A'}>{attribute.value || 'N/A'}</MenuItem>
  </Select>
);

export const renderDatePicker = (attribute, index, isEditMode) => (
  <DatePicker
    key={index}
    label={attribute.name || 'N/A'}
    value={attribute.value ? new Date(attribute.value) : null}
    format="yyyy/MM/dd"
    readOnly={!isEditMode}
    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />} s
  />
);

export const AttributesRenderer = ({ attributes, isEditMode }) => (
  <Box>
    {attributes.map((attribute, index) => {
      switch (attribute.fieldType) {
        case 'FIXED_DROP_DOWN':
          return renderDropDown(attribute, index, isEditMode);
        case 'DATE':
          return renderDatePicker(attribute, index, isEditMode);
        case 'SINGLE_LINE_TEXT':
          return renderSingleTextField(attribute, index, isEditMode);
        case 'MULTI_LINE_TEXT':
          return renderMultiTextField(attribute, index, isEditMode);
        default:
          return renderTextField(attribute, index, isEditMode);
      }
    })}
  </Box>
);
