import React from 'react';
import { TextField, Select, MenuItem, Box } from '@mui/material';
import { DatePicker } from '@mui/lab';


export const renderTextField = (attribute, index, isEditMode,handleInputChange) => (
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
    onChange={(event) => handleInputChange(event, attribute.apiName)} // Call handleInputChange when the value changes
 
    inputProps={{ 'data-apiName': attribute.apiName }} // Add the apiName attribute to the input
  />
);

  export const renderSingleTextField = (attribute, index, isEditMode,handleInputChange) => {
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
        onChange={(event) => handleInputChange(event, attribute.apiName)} // Call handleInputChange when the value changes
 
        inputProps={{ 'data-apiName': attribute.apiName }} // Add the apiName attribute to the input
      />
    );
  };
export const renderMultiTextField = (attribute, index, isEditMode,handleInputChange) => {
  return (
    <TextField
      key={index}
      label={attribute.name || 'N/A'}
      defaultValue={attribute.value || 'N/A'}
      variant="outlined"
      fullWidth
      rowax={4}
      multiline
      margin="normal"
      disabled={!isEditMode}
      InputLabelProps={{
        shrink: true,
      }}
      //onChange={(event) => handleInputChange(event, attribute.apiName)} // Call handleInputChange when the value changes
      onBlur={(event) => handleInputChange(event, attribute.apiName)} 

      inputProps={{ 'data-apiName': attribute.apiName }} // Add the apiName attribute to the input
    />
  );
};



// Similarly, add the apiName attribute to the other render functions

export const renderDropDown = (attribute, index, isEditMode,handleInputChange) => (
  <Select
    key={index}
    label={attribute.name || 'N/A'}
    value={attribute.value || 'N/A'}
    fullWidth
    variant="outlined"
    margin="normal"
    disabled={!isEditMode}
    onChange={(event) => handleInputChange(event, attribute.apiName)} // Call handleInputChange when the value changes
 
  >
    <MenuItem value={attribute.value || 'N/A'}>{attribute.value || 'N/A'}</MenuItem>
  </Select>
);

export const renderDatePicker = (attribute, index, isEditMode,handleInputChange) => (
  <DatePicker
    key={index}
    label={attribute.name || 'N/A'}
    value={attribute.value ? new Date(attribute.value) : null}
    format="yyyy/MM/dd"
    readOnly={!isEditMode}
    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
    inputProps={{ 'data-apiName': attribute.apiName }} // Add the apiName attribute to the input
    onChange={(event) => handleInputChange(event, attribute.apiName)} // Call handleInputChange when the value changes
 
  />
);
export const AttributesRenderer = ({ attributes, templateAttributes, isEditMode, additionalAttributes, formState, handleInputChange }) => (
  <Box>
    {templateAttributes.map((templateAttribute, index) => {
      // Find the corresponding attribute in step.attributes using apiName
      const stepAttribute = attributes.find(attr => attr.apiName === templateAttribute.apiName);

      // Find the corresponding attribute in qualityProcessStepAttributes using apiName
      const additionalAttribute = additionalAttributes.find(attr => attr.apiName === templateAttribute.apiName);

      // Find the fieldType for the additional attribute
      const fieldType = additionalAttribute ? additionalAttribute.fieldType : null;

      const fieldValue = formState[templateAttribute.apiName] || ''; // Get the value from formState

      console.log("fieldType", fieldType)

      switch (fieldType) {
        case 'FIXED_DROP_DOWN':
          return renderDropDown(stepAttribute || templateAttribute, index, isEditMode, handleInputChange);
        case 'DATE':
          return renderDatePicker(stepAttribute || templateAttribute, index, isEditMode, handleInputChange);
        case 'SINGLE_LINE_TEXT':
          return renderSingleTextField(stepAttribute || templateAttribute, index, isEditMode, handleInputChange);
        // Add other cases for field types
        case 'MULTI_LINE_TEXT':
          return renderMultiTextField(stepAttribute || templateAttribute, index, isEditMode, handleInputChange);
        // Add other cases for field types
        default:
          return renderTextField(stepAttribute || templateAttribute, index, isEditMode, handleInputChange);
      }
    })}
  </Box>
);
