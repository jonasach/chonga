import React, { useContext } from 'react';
import AppContext from 'src/contexts/ArenaContext';
import { Typography, Box } from '@mui/material';

export default function QualityTemplates() {
  const { qualityTemplates, selectedGUID } = useContext(AppContext);

  const renderAttributes = (attributes) => (
    <Box paddingLeft={4}>
      {attributes.map((attribute, index) => (
        <Typography key={index} variant="body2">
          <strong>{attribute.name}:</strong> {attribute.value}
        </Typography>
      ))}
    </Box>
  );

  const renderSteps = (steps) => (
    <Box paddingLeft={3}>
      {steps.map((step, index) => (
        <div key={index}>
          <Typography variant="h6">Step {index + 1}</Typography>
          {step.attributes && renderAttributes(step.attributes)}
        </div>
      ))}
    </Box>
  );

  const renderResults = (results) => {
    const selectedResult = results.find(result => result.guid === selectedGUID);

    if (!selectedResult) {
      return null;
    }

    return (
      <Box paddingLeft={2}>
        <Typography variant="h5">{selectedResult.name}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {selectedResult.description}</Typography>
        {selectedResult.steps && renderSteps(selectedResult.steps)}
      </Box>
    );
  };

  return (
    <div>
      {qualityTemplates && qualityTemplates.results && (
        <Box padding={2}>
          <Typography variant="h4">Quality Templates</Typography>
          {renderResults(qualityTemplates.results)}
        </Box>
      )}
    </div>
  );
}
