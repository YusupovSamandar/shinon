"use client"
import React, { useEffect, useState } from 'react';
import ReportMessage from '@/app/components/reportList';
import Sidebar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import { CheckUserRole } from '../routerGuard';
import axios from '@/app/axiosInstance';
import { API_URL } from '../apiConfig';

function formatDate(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    const isToday = date.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
    const isYesterday = date.toISOString().split('T')[0] === new Date(currentDate.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (isToday) {
        return 'Today';
    } else if (isYesterday) {
        return 'Yesterday';
    } else {
        // Format the date as "Day of the Month Month"
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
    }
}

export default function Report() {
    const currentDate = new Date().toISOString().split('T')[0];
    const [reportData, setReportData] = useState({});

    const fetchReportUpdates = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const endOfToday = new Date();

        const { data: updateReportData } = await axios.post(`${API_URL}/api/updates/report`, { startDate: yesterday, endDate: endOfToday });
        return updateReportData
    }

    useEffect(() => {
        (async function () {
            const reportUpdatesDT = await fetchReportUpdates();
            const groupedData = reportUpdatesDT.reduce((groups, item) => {
                const date = item.date.split('T')[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(item);
                return groups;
            }, {});

            const mergedData = {};
            for (const dateKey in groupedData) {
                const updates = groupedData[dateKey];
                const mergedUpdates = updates.reduce((acc, update) => {
                    const existingPatient = acc.find(patient => patient.patientFullName === update.patientFullName);
                    if (existingPatient) {
                        existingPatient.updates.push(update);
                    } else {
                        acc.push({ patientFullName: update.patientFullName, updates: [update] });
                    }
                    return acc;
                }, []);
                mergedData[dateKey] = mergedUpdates;
            }

            console.log(mergedData);

            setReportData(mergedData);
        })();

    }, []);
    return (
        <div>
            <CheckUserRole allowedRoles={['developer', 'viewer', 'admin', 'interpreter']}>
                <Sidebar enableSearch={false} />
                <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                </Typography>
                {Object.keys(reportData).map((objDate, ind) => (
                    <div key={ind}>
                        <div style={{ color: 'rgb(14, 162, 189)', padding: '10px', fontSize: "0.9rem", backgroundColor: "#F0F0F0" }}>
                            <b>{formatDate(objDate)}</b>
                        </div>
                        {reportData[objDate].map((onePTUpdate, updateIndx) => (
                            <ReportMessage
                                key={updateIndx}
                                ptName={onePTUpdate.patientFullName}
                                reportList={onePTUpdate.updates}
                            />
                        ))}
                    </div>
                ))}
            </CheckUserRole>
        </div>
    )
}
