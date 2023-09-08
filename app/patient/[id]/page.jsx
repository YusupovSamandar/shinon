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
import MgsBar from '@/app/components/sendMessageBar';
import ExpandPanel from '@/app/components/expandPanel'
import PreWorkup from "@/app/components/analysisContent/pre-workup";



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

const PatientAnalysis = () => {

    const [preWorkup, setPreWorkup] = React.useState({
        complete: false,
        details: [
            {
                analysisName: "Blood test",
                done: false
            },
            {
                analysisName: "HBV DNA Quantitive",
                done: false
            },
            {
                analysisName: "Hepatisis B Core antibodies",
                done: false
            },
            {
                analysisName: "CT scan",
                done: false
            },
            {
                analysisName: "Calcium scoring",
                done: false
            },
            {
                analysisName: "USG pelvis",
                done: false
            },
            {
                analysisName: "USG abdomen",
                done: false
            }
        ]
    });

    return (
        <div>
            <ExpandPanel
                groupItem1={{
                    label: "Pre-Workup Tests",
                    content: <PreWorkup checksData={preWorkup} setChecksData={setPreWorkup} />,
                    disableAccortion: preWorkup.complete,
                    setCurrentStatus: setPreWorkup
                }}
                groupItem2={{ label: "Surgery", content: <div>hello</div> }}
                groupItem3={{ label: "Post Surgery", content: <div>hello</div> }}
            />
            <br />
            <div style={{ textAlign: "right" }}>
                <Button variant="contained">Save Changes</Button>
            </div>
        </div>
    );
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
            <Tabs config={{
                content1: { label: "Updates", value: <UpdatesOnPatient /> },
                content2: { label: "Analysis", value: <PatientAnalysis /> }
            }} />

            <MgsBar />
        </div>
    )
}
