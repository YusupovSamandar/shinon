"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import axios from '@/app/axiosInstance';
import { useSelector } from 'react-redux';
import { API_URL } from "@/app/apiConfig";
import Divider from '@mui/material/Divider';


export default function BottomAppBar() {
    const [completePatients, setCompletePatients] = React.useState([]);
    React.useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/patients/complete`);
            setCompletePatients(data);
        })()
    }, []);
    const searchTxt = useSelector((state) => state.searchValue.value)

    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Paper square >
                    <List sx={{ mb: 2 }}>
                        {(completePatients && completePatients.length > 0) ? completePatients.filter((pt) => pt.fullName.toLowerCase().includes(searchTxt) || pt.nameOfDonor.toLowerCase().includes(searchTxt) || pt?.patientUHID.includes(searchTxt))
                            .map((currPatient, indx) => {
                                const ptDate = new Date(currPatient.returnTicket);
                                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                                const returnedDate = ptDate.toLocaleDateString(undefined, options);
                                return (
                                    <Link key={indx} href={`/patient/${currPatient._id}`}>
                                        <React.Fragment >
                                            <ListItem style={{ padding: '0px 10px', alignItems: "center", justifyContent: "space-between" }} button>
                                                <ListItemText style={{ margin: 0, padding: "15px 0", flex: "0 auto" }} primary={currPatient.fullName} />
                                                <ListItemText style={{ margin: 0, padding: "15px 0", flex: "0 auto" }} secondary={returnedDate} />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    </Link>
                                )
                            }) : <p style={{ textAlign: "center" }}>No Patients Found</p>}
                    </List>
                </Paper>
            </React.Fragment>

        </>
    );
}