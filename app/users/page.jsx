"use client"
import React, { useEffect } from 'react';
import AddUser from "@/app/components/add-user";
import SwitchTabs from "@/app/components/patientTabs";
import Table from "@/app/components/table";
import { useSelector, useDispatch } from 'react-redux';
import { saveNewData } from '../redux/features/users-slice';
import Sidebar from '@/app/components/sidebarToggle';
import Typography from '@mui/material/Typography';
import { fetchAllUsers } from '../redux/features/users-slice';

export default function Users() {
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.usersList.value);
    const [currentTab, setCurrentTab] = React.useState(0);
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);
    const tableHearders = [
        {
            accessorKey: 'login',
            header: 'User Login',
        },
        {
            accessorKey: 'password',
            header: 'Password',
        }
    ];
    return (
        <div>
            <Sidebar enableSearch={false} />
            <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            </Typography>
            <SwitchTabs
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                config={{
                    content1: { label: "Users", value: <Table data={usersList} headers={tableHearders} setNewData={saveNewData} /> },
                    content2: { label: "Add User", value: <AddUser setCurrentTab={setCurrentTab} /> }
                }}
            />

        </div>
    )
}
