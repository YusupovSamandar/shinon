"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ groupItem1, groupItem2, groupItem3, groupItem4 }) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <p>{groupItem1.label}</p>
                        <div>
                            <Checkbox
                                checked={groupItem1.disableAccortion}
                                onChange={() => {
                                    groupItem1.setCurrentStatus((prev) => {
                                        return { ...prev, preWorkup: { ...prev.preWorkup, complete: !prev.preWorkup.complete } }
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {groupItem1.content}
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <p>{groupItem2.label}</p>
                        <div>
                            <Checkbox
                                checked={groupItem2.disableAccortion}
                                onChange={() => {
                                    groupItem2.setCurrentStatus((prev) => {
                                        return { ...prev, surgery: { ...prev.surgery, complete: !prev.surgery.complete } }
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {groupItem2.content}
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <p>{groupItem3.label}</p>
                        <div>
                            <Checkbox
                                checked={groupItem3.disableAccortion}
                                onChange={() => {
                                    groupItem3.setCurrentStatus((prev) => {
                                        return { ...prev, postSurgery: { ...prev.postSurgery, complete: !prev.postSurgery.complete } }
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>

                </AccordionSummary>
                <AccordionDetails>
                    {groupItem3.content}
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <p>{groupItem4.label}</p>
                        <div>
                            <Checkbox
                                checked={groupItem4.disableAccortion}
                                onChange={() => {
                                    groupItem4.setCurrentStatus((prev) => {
                                        return { ...prev, postTxFollowUp: { ...prev.postTxFollowUp, complete: !prev.postTxFollowUp.complete } }
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                    </div>

                </AccordionSummary>
                <AccordionDetails>
                    {groupItem3.content}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}