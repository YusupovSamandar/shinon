"use client"
import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from "./../redux/features/patientsList-slice";
import { CheckUserRole } from '../routerGuard';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import NotificationsIcon from '@mui/icons-material/Notifications';


const EmptyLabel = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <NotificationsIcon style={{ color: "rgba(0, 0, 0, 0.2)", fontSize: "4rem" }} />
            <br />
            <br />
            <Typography variant="body1" gutterBottom>
                All notifications appear here
            </Typography>
        </div>
    )
}


export default function Notifications() {
    const [currentChips, setCurrentChip] = useState(0);
    const [currentNotifications, setCurrentNotifications] = useState([]);
    const router = useRouter();
  const currentUser = useSelector((state) => state.userAuth);
    const warningMsgs = useSelector((state) => state.warningMessagesList.value);
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser.isAuth) {
            dispatch(fetchPatients(currentUser.value.hospital));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const nextDt = currentChips === 0 ? warningMsgs : []
        setCurrentNotifications(nextDt);
        console.log(warningMsgs)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChips, warningMsgs]);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return (
        <CheckUserRole allowedRoles={['developer', 'viewer', 'admin', 'interpreter']}>
            <div style={{ margin: "0 16px" }}>

                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <IconButton
                        onClick={() => router.back()}
                        style={{ position: 'relative', right: '10px' }}
                        aria-label="delete"
                        size="large"
                    >
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                    <Typography style={{ fontWeight: "500" }} variant="h6">
                        Notifications
                    </Typography>
                </div>

                <Stack style={{ marginLeft: "6px" }} direction="row" spacing={1}>
                    {["visa", "others"].map((txt, indx) => {
                        const selectedStyle = { color: "#fff", backgroundColor: "#333", border: "none", borderRadius: "10px" }
                        const unselectedStyle = { color: "#333", borderRadius: "10px" }
                        return (
                            <Chip key={indx} label={txt} style={currentChips === indx ? selectedStyle : unselectedStyle} variant={currentChips === indx ? "outlined" : "filled"} onClick={() => setCurrentChip(indx)} />
                        )
                    })}

                </Stack>

                <br />
                <>
                    {
                        currentNotifications.length > 0 ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {currentNotifications.map((msg, indx) => (
                                    <Link key={indx} href={msg.goto}>
                                        <Alert severity={msg.messageSeverity}><b>{msg.patient}&apos;s</b> {msg.message}</Alert>
                                    </Link>
                                ))}
                            </Stack>
                            :
                            <EmptyLabel />
                    }
                </>
            </div>
        </CheckUserRole>
    )
}
