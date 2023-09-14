"use client"
import React, { useEffect } from 'react';
import BottomListBar from "./../components/patietsList";
import SideBar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import BottomFilterBar from "@/app/components/bottomFilterBar";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { fetchPatients } from "./../redux/features/patientsList-slice";

export default function Patients() {
    const warningMsgs = useSelector((state) => state.warningMessagesList.value);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPatients());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div>
            <SideBar enableSearch={true} />
            <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            </Typography>
            {warningMsgs.map((msg, indx) => (
                <Link key={indx} href={msg.goto}>
                    <Alert severity={msg.messageSeverity}><b>{msg.patient}&apos;s</b> {msg.message}</Alert>
                </Link>
            ))}
            <BottomListBar />
            <div style={{ height: "50px" }}></div>
            <BottomFilterBar
                item1={{ label: "Pre-Work up", icon: <ShowChartIcon /> }}
                item2={{ label: "Surgery", icon: <StackedLineChartIcon /> }}
                item3={{ label: "Post Surgery", icon: <ShowChartIcon /> }}
                item4={{ label: "Post tx follow up updates", icon: <ShowChartIcon /> }}
            />
        </div>
    );
}
