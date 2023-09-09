"use client"
import React from 'react';
import AddUser from "@/app/components/add-user";
import SwitchTabs from "@/app/components/patientTabs";
import Table from "@/app/components/table";
import { useSelector, useDispatch } from 'react-redux';
import { saveNewData } from '../redux/features/users-slice';
import Sidebar from '@/app/components/sidebarToggle';
import Typography from '@mui/material/Typography';

export default function Users() {
    const usersList = useSelector((state) => state.usersList.value);

    const tableHearders = [
        {
            accessorKey: 'fullName',
            header: 'Full Name',
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
                config={{
                    content1: { label: "Users", value: <Table data={usersList} headers={tableHearders} setNewData={saveNewData} /> },
                    content2: { label: "Add User", value: <AddUser /> }
                }}
            />

        </div>
    )
}
