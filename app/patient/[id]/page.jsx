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
import axios from '@/app/axiosInstance';
import { displayForUser } from '@/app/routerGuard';
import { useSelector } from 'react-redux';
import { CheckUserRole } from '@/app/routerGuard';

function formatUpdatesDate(date) {
    date = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        // Today
        return `today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        // Yesterday
        return `yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        // Other days
        return `${date.toLocaleString('en-US', { month: 'long', day: 'numeric' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}

const UpdatesOnPatient = ({ patientUpdates, setPatientUpdates, patientID }) => {
    const [pageToLoad, setPageToLoad] = useState(1);
    const [loadLabel, setLoadLabel] = useState("load more")
    const loadMoreUpdates = async () => {
        setLoadLabel('loading...');
        const thisDate = new Date();
        const endOfDay = new Date(thisDate);
        endOfDay.setHours(0, 0, 0, 0);
        const restUpdates = await axios.post(`${API_URL}/api/updates/load/${patientID}`, {
            numberOfDataToLoad: 3,
            page: pageToLoad,
            myEndDate: endOfDay
        });
        if (restUpdates.status === 200) {
            setPatientUpdates((prev) => [...prev, ...restUpdates.data]);
            setPageToLoad((prev) => prev + 1);
            if (restUpdates.data.length < 3) {
                setLoadLabel('no more to display');
            } else {
                setLoadLabel('load more');
            }
        }

    }
    return (
        <div>
            {(patientUpdates.length > 0) ? patientUpdates.map((msg, indx) => {
                const thisDate = formatUpdatesDate(msg.date);
                return (
                    <div key={indx}>
                        <MessageBox
                            primary={msg.content}
                            time={thisDate}
                            editor={msg.editor}

                        />
                        <br />
                    </div>
                )
            }) : <div style={{ textAlign: "center" }}>no updates for today</div>}
            <br />
            <div style={{ textAlign: "center" }}>
                <Button onClick={loadMoreUpdates} disabled={loadLabel === 'no more to display' || loadLabel === "loading..."} style={{ backgroundColor: "#64CCC5" }} endIcon={<ExpandMoreIcon />} variant="contained" size="small">
                    {loadLabel}
                </Button>
            </div>
        </div>
    )
}

const PatientAnalysis = ({ allPatientAnalysis, ptId, chagePatientDT, currUserRole }) => {

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
                groupItem4={{
                    label: "Post Tx Follow Up Updates",
                    content: <PreWorkup checksData={analysisTests} checksSection={'postTxFollowUp'} setChecksData={setAnalysisTests} />,
                    disableAccortion: analysisTests.postTxFollowUp.complete,
                    setCurrentStatus: setAnalysisTests
                }}
            />
            <br />
            {displayForUser(['admin', 'interpreter', 'developer'], currUserRole) && <div style={{ textAlign: "right" }}>
                <Button onClick={handleSave} disabled={saving === "saving..."} color={saving === 'Saved!!' ? 'success' : 'primary'} variant="contained">{saving}</Button>
            </div>}

        </div>
    );
}

export default function CurrentPatient({ params }) {
    const patientID = params.id
    const currentUser = useSelector((state) => state.userAuth);
    const [patientDetails, setPatientDetails] = useState(undefined);
    const [patientUpdates, setPatientUpdates] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        const thisDate = new Date();
        const startOfDay = new Date(thisDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(thisDate);
        endOfDay.setHours(23, 59, 59, 999);
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/patients/${patientID}`);
            const { data: thisPatientUpdate } = await axios.post(`${API_URL}/api/updates/initial/${patientID}`, {
                myStartDate: startOfDay,
                myEndDate: endOfDay
            });
            setPatientUpdates(thisPatientUpdate);

            setPatientDetails(data);
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <CheckUserRole allowedRoles={['developer', 'viewer', 'admin', 'interpreter']}>
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
                                    <Avatar sx={{ width: 50, height: 50 }} alt={patientDetails.fullName} src={`${API_URL}${patientDetails.patientPicture}`} />
                                    <Typography component="div">
                                        {patientDetails.fullName}
                                    </Typography>
                                </div>

                                <Link href={`/patient/edit/${patientID}`} style={{ pointerEvents: displayForUser(['admin', 'developer'], currentUser?.value?.role) ? 'auto' : 'none' }}>
                                    <IconButton style={{ position: 'relative', right: '10px', paddingLeft: "30px" }} aria-label="delete" size="large">
                                        <ManageAccountsIcon fontSize="inherit" />
                                    </IconButton>
                                </Link>
                            </div>
                            <br />
                            <PatientStepper activeStepNumber={patientDetails.currentStatus} />
                            {/* <br /> */}
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ fontSize: 15, marginTop: "10px" }} color="text.secondary">
                                    Status: <b>{patientDetails.currentStatus}</b>
                                </Typography>
                                <Typography sx={{ fontSize: 15, marginTop: "10px", marginRight: "16px" }} color="text.secondary">
                                    UHID: <b>{patientDetails.patientUHID}</b>
                                </Typography>
                            </div>
                            <br />
                        </div>
                        <Divider />
                        <Tabs
                            config={{
                                content1: {
                                    label: "Updates", value: <UpdatesOnPatient patientUpdates={patientUpdates} setPatientUpdates={setPatientUpdates} patientID={patientID} />
                                },
                                content2: { label: "Analysis", value: <PatientAnalysis currUserRole={currentUser?.value?.role} allPatientAnalysis={patientDetails.patientProgress} ptId={patientID} chagePatientDT={setPatientDetails} /> },
                            }}
                            setCurrentTab={setCurrentTab}
                            currentTab={currentTab}
                        />

                        <Typography style={{ minHeight: "44px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                        </Typography>
                        {displayForUser(['admin', 'interpreter', 'developer'], currentUser?.value?.role) && <MgsBar updatePatientUpdates={setPatientUpdates} updatingPatientId={patientID} />}


                    </div>
                        :
                        <div></div>
                }

            </CheckUserRole>
        </div>

    )
}
