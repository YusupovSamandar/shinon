"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { updateByStatus } from "@/app/redux/features/patientsList-slice";
import { useDispatch } from 'react-redux';


export default function SimpleBottomNavigation({ item1, item2, item3, item4 }) {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    const filterPatientList = (chosenStatus) => {
        dispatch(updateByStatus(chosenStatus));
    }

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {
                    [item1, item2, item3, item4].map((eachItem, indx) => (
                        <BottomNavigationAction
                            key={indx}
                            onClick={() => {
                                filterPatientList(eachItem.label);
                            }}
                            style={{ padding: "10px 0px" }}
                            label={eachItem.label.length > 12 ? eachItem.label.slice(0, 14) + "..." : eachItem.label}
                            icon={eachItem.icon}
                        />
                    ))
                }
            </BottomNavigation>
        </Paper>
    );
}