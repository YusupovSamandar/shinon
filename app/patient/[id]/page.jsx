"use client"
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CustomProgressBar from "@/app/components/customProgressBar";
import Tabs from "@/app/components/patientTabs";
import MessageBox from "@/app/components/messageBox";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MgsBar from '@/app/components/sendMessageBar'


const UpdatesOnPatient = () => {
    return (
        <div>
            <MessageBox
                primary={"Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card."}
                time={"Jan 9, 2014"}
                editor={"Samandar Yusupov"}

            />
            <br />
            <div style={{ textAlign: "center" }}>
                <Button style={{ backgroundColor: "#64CCC5" }} endIcon={<ExpandMoreIcon />} variant="contained" size="small">
                    load more
                </Button>
            </div>
        </div>
    )
}

export default function CurrentPatient({ params }) {
    const patientID = params.id
    return (
        <div>
            <div style={{ marginLeft: '16px' }}>
                <br />
                <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                    <Link href="/patients">
                        <IconButton style={{ position: 'relative', right: '10px' }} aria-label="delete" size="large">
                            <ArrowBackIcon fontSize="inherit" />
                        </IconButton>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                        <Avatar sx={{ width: 50, height: 50 }} alt="Samandar" src="/static/images/avatar/2.jpg" />
                        <Typography component="div">
                            Samandar Yusupov
                        </Typography>
                    </div>
                </div>

                <Typography sx={{ fontSize: 15, marginTop: "10px" }} color="text.secondary">
                    Status: <b>Surgery</b>
                </Typography>
                <CustomProgressBar progress={20} />
                <br />
            </div>
            <Divider />
            <Tabs config={{ content1: { label: "Updates", value: <UpdatesOnPatient /> }, content2: { label: "Analysis", value: "val2" } }} />

            <MgsBar />
        </div>
    )
}
