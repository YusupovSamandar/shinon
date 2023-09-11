import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Pre-Workup',
    'Surgery',
    'Post Surgery',
    'Post Tx follow up',
];

export default function HorizontalLinearAlternativeLabelStepper({ activeStepNumber }) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStepNumber} alternativeLabel>
                {steps.map((label, indx) => (
                    <Step key={label}>
                        <StepLabel></StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}