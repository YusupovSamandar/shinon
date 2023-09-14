"use client"
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
import PatientStepper from "@/app/components/stepper";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { API_URL } from "./../../apiConfig"
import axios from 'axios';


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

const PatientAnalysis = ({ allPatientAnalysis, ptId, chagePatientDT }) => {

    const [analysisTests, setAnalysisTests] = useState(allPatientAnalysis);
    const [saving, setSaving] = useState('Save Changes');
    const handleSave = async () => {
        const newCurrentStatus = analysisTests.postTxFollowUp.complete ? 'complete' :
            analysisTests.postSurgery.complete ? 'Post tx follow up updates' :
                analysisTests.surgery.complete ? 'Post Surgery' :
                    analysisTests.preWorkup.complete ? 'Surgery' :
                        'Pre-Work up';

        setSaving('saving...');
        const { data: updatedPTData } = await axios.put(`${API_URL}/api/patients/${ptId}`, {
            patientProgress: analysisTests,
            currentStatus: newCurrentStatus
        });
        chagePatientDT(updatedPTData);
        setSaving('Saved!!');
        setTimeout(() => {
            setSaving('Save Changes');
        }, 1000);
    }

    return (
        <div>
            <ExpandPanel
                groupItem1={{
                    label: "Pre-Workup Tests",
                    content: <PreWorkup checksData={analysisTests} checksSection={'preWorkup'} setChecksData={setAnalysisTests} />,
                    disableAccortion: analysisTests.preWorkup.complete,
                    setCurrentStatus: setAnalysisTests
                }}
                groupItem2={{
                    label: "Surgery",
                    content: <PreWorkup checksData={analysisTests} checksSection={'surgery'} setChecksData={setAnalysisTests} />,
                    disableAccortion: analysisTests.surgery.complete,
                    setCurrentStatus: setAnalysisTests
                }}
                groupItem3={{
                    label: "Post Surgery",
                    content: <PreWorkup checksData={analysisTests} checksSection={'postSurgery'} setChecksData={setAnalysisTests} />,
                    disableAccortion: analysisTests.postSurgery.complete,
                    setCurrentStatus: setAnalysisTests
                }}
            />
            <br />
            <div style={{ textAlign: "right" }}>
                <Button onClick={handleSave} color={saving === 'Saved!!' ? 'success' : 'primary'} variant="contained">{saving}</Button>
            </div>
        </div>
    );
}

export default function CurrentPatient({ params }) {
    const patientID = params.id
    const [patientDetails, setPatientDetails] = useState(undefined);
    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/patients/${patientID}`);
            setPatientDetails(data);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {
                patientDetails ? <div>
                    <div style={{ marginLeft: '16px' }}>
                        <br />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                            <Link href="/patients">
                                <IconButton style={{ position: 'relative', right: '10px' }} aria-label="delete" size="large">
                                    <ArrowBackIcon fontSize="inherit" />
                                </IconButton>
                            </Link>
                            <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                                <Avatar sx={{ width: 50, height: 50 }} alt="Samandar" src={`${API_URL}${patientDetails.patientPicture}`} />
                                <Typography component="div">
                                    {patientDetails.fullName}
                                </Typography>
                            </div>
                            <Link href={`/patient/edit/${patientID}`}>
                                <IconButton style={{ position: 'relative', right: '10px', paddingLeft: "30px" }} aria-label="delete" size="large">
                                    <ManageAccountsIcon fontSize="inherit" />
                                </IconButton>
                            </Link>
                        </div>
                        <br />
                        <PatientStepper activeStepNumber={patientDetails.currentStatus} />
                        {/* <br /> */}
                        <Typography sx={{ fontSize: 15, marginTop: "10px" }} color="text.secondary">
                            Status: <b>{patientDetails.currentStatus}</b>
                        </Typography>
                        <br />
                    </div>
                    <Divider />
                    <Tabs config={{
                        content1: { label: "Updates", value: <UpdatesOnPatient /> },
                        content2: { label: "Analysis", value: <PatientAnalysis allPatientAnalysis={patientDetails.patientProgress} ptId={patientID} chagePatientDT={setPatientDetails} /> }
                    }} />

                    <Typography style={{ minHeight: "44px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    </Typography>

                    <MgsBar />
                </div>
                    :
                    <div></div>
            }


        </div>

    )
}
