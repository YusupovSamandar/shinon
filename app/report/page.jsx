"use client"
import React, { useEffect, useState } from 'react';
import ReportMessage from '@/app/components/reportList';
import Sidebar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';


export default function Report() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const data = [
            {
                patient: "Bekzod Jumayev",
                reporter: "Samandar Yusupov",
                message: "feeling good Do you have Paris recommendations? Have you ever"
            },
            {
                patient: "Jamshid Jumayev",
                reporter: "Qosim Yusupov",
                message: "Wish I could come, but I'm out of town this. "
            },
            {
                patient: "Sardor Jumayev",
                reporter: "Jorabek Yusupov",
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga blanditiis voluptatem iste saepe veritatis error."
            }
        ]
        setReportData(data);
    }, []);
    return (
        <div>
            <Sidebar enableSearch={false} />
            <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            </Typography>
            <div style={{ color: 'rgb(14, 162, 189)', padding: '10px', fontSize: "0.9rem", backgroundColor: "#F0F0F0" }}><b>Today</b></div>
            <ReportMessage reportList={reportData} />
            <div style={{ color: 'rgb(14, 162, 189)', padding: '10px', fontSize: "0.9rem", backgroundColor: "#F0F0F0" }}><b>Yesterday</b></div>
            <ReportMessage reportList={reportData} />
        </div>
    )
}
