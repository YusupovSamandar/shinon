import React from 'react';
import BottomListBar from "./../components/patietsList";
import SideBar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';


export default function Patients() {
    return (
        <div>
            <SideBar enableSearch={true} />
            <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            </Typography>
            <BottomListBar />
        </div>
    );
}
