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
import { useSelector, useDispatch } from 'react-redux';
import { displayForUser } from '@/app/routerGuard';
import { updateValue } from '@/app/redux/features/patientsList-slice';
import { updateState } from '@/app/redux/features/warningMessagesList-slice';


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
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(updateValue(''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const patientsList = useSelector((state) => state.patientsList.value)
    React.useEffect(() => {
        if (patientsList.length > 0) {
            console.log(patientsList);
            // dispatch(updateState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientsList]);

    const currentUser = useSelector((state) => state.userAuth);


    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Paper square >
                    <List sx={{ mb: 2 }}>
                        {(patientsList && patientsList.length > 0) ? patientsList.map((currPatient, indx) => {
                            const progressNumber = currPatient.currentStatus === 'Pre-Work up'
                                ? 0 : currPatient.currentStatus === 'Surgery'
                                    ? 25 : currPatient.currentStatus === 'Post Surgery'
                                        ? 50 : currPatient.currentStatus === 'Post tx follow up updates'
                                            ? 75 : 100
                            return (
                                <Link key={indx} href={`/patient/${currPatient._id}`}>
                                    <React.Fragment >
                                        <ListItem style={{ padding: '0px 10px', alignItems: "center" }} button>
                                            <ProgressIndicator progress={progressNumber} />
                                            <ListItemText style={{ borderBottom: "1px solid #eee", margin: 0, padding: "15px 0" }} primary={currPatient.fullName} secondary={currPatient.currentStatus} />
                                        </ListItem>
                                    </React.Fragment>
                                </Link>
                            )
                        }) : <p style={{ textAlign: "center" }}>No Patients Found</p>}
                    </List>
                </Paper>
            </React.Fragment>
            {displayForUser(['admin', 'developer'], currentUser?.value?.role) && <HideOnScroll>
                <div style={{ position: "fixed", bottom: "100px", zIndex: "9999999", right: "90px" }}>
                    <Link href={'/add-patient'}>
                        <StyledFab color="secondary" aria-label="add">
                            <AddIcon />
                        </StyledFab>
                    </Link>
                </div>
            </HideOnScroll>}

        </>
    );
}