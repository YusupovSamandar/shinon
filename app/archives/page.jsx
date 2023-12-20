"use client"
import React, { useEffect } from 'react';
import PatientLists from "./../components/normalUsersList";
import SideBar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { setValue } from "./../redux/features/searchValue-slice";
import { CheckUserRole } from '../routerGuard';

export default function Patients() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setValue(""));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <CheckUserRole allowedRoles={['developer', 'viewer', 'admin', 'interpreter']}>
                <SideBar enableSearch={true} />
                <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                </Typography>
                <PatientLists />
                <div style={{ height: "50px" }}></div>
            </CheckUserRole>
        </div>
    );
}
