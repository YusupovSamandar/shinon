"use client"
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CustomProgressBar from "@/app/components/customProgressBar";
import Tabs from "@/app/components/patientTabs";

export default function CurrentPatient({ params }) {
    const patientID = params.id
    return (
        <div>
            <div style={{ marginLeft: '16px' }}>
                <br />
                <Avatar sx={{ width: 60, height: 60, margin: "10px 0" }} alt="Samandar" src="/static/images/avatar/2.jpg" />
                <Typography component="div">
                    Samandar Yusupov
                </Typography>
                <Typography sx={{ fontSize: 15 }} color="text.secondary">
                    <b>Surgery</b>
                </Typography>
                <CustomProgressBar progress={20} />
                <br />
            </div>
            <Divider />
            <Tabs config={{ content1: { label: "tab1", value: "val1" }, content2: { label: "tab2", value: "val2" } }} />
        </div>
    )
}
