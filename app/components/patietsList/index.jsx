"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AddIcon from '@mui/icons-material/Add';
import ProgressIndicator from "./../progressBar"
import Link from 'next/link';
import { useSelector } from 'react-redux'


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="up" in={!trigger}>
            {children}
        </Slide>
    );
}



const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function BottomAppBar() {

    const patientsList = useSelector((state) => state.patientsList.value)

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Paper square sx={{ pb: '50px' }}>
                    <List sx={{ mb: 2 }}>
                        {patientsList.map(({ id, name, secondary, progressNumber }) => (
                            <Link key={id} href={`/patient/${id}`}>
                                <React.Fragment >
                                    <ListItem style={{ padding: '0px 10px', alignItems: "center" }} button>
                                        <ProgressIndicator progress={progressNumber} />
                                        <ListItemText style={{ borderBottom: "1px solid #eee", margin: 0, padding: "15px 0" }} primary={name} secondary={secondary} />
                                    </ListItem>
                                </React.Fragment>
                            </Link>
                        ))}
                    </List>
                </Paper>
            </React.Fragment>
            <HideOnScroll>
                <div style={{ position: "fixed", bottom: "50px", zIndex: "9999999", right: "90px" }}>
                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon />
                    </StyledFab>
                </div>
            </HideOnScroll>
        </>
    );
}