"use client"
import React, { useEffect, useState } from 'react';
import ReportMessage from '@/app/components/reportList';
import Sidebar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import { CheckUserRole } from '../routerGuard';
import axios from '@/app/axiosInstance';
import { API_URL } from '../apiConfig';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    const [reportData, setReportData] = useState({});
    const [pureReportDT, setPureReportDT] = useState([]);
    const [fetchingStartDate, setFetchingStartDate] = useState(0);
    const [loadMoreBtnLabel, setLoadMoreBtnLabel] = useState('load more')
    const [toLoadPage, setToLoadPage] = useState(1);

    const fetchReportUpdates = async (stDate, endDt) => {
        const { data: updateReportData } = await axios.post(`${API_URL}/api/updates/report`, { startDate: stDate, endDate: endDt });
        if (updateReportData && updateReportData.length > 0) {
            setPureReportDT((prevv) => [...prevv, ...updateReportData]);
        }
        return updateReportData;
    }

    const formatReportData = (fetchedReportingDT) => {
        if (fetchedReportingDT.length === 0) {
            return;
        }
        const groupedData = fetchedReportingDT.reduce((groups, item) => {
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

        setReportData(mergedData);
    }

    const handleLoadMore = async () => {
        setLoadMoreBtnLabel('loading');
        const restUpdates = await axios.post(`${API_URL}/api/updates/report/load`, { page: toLoadPage, numberOfDataToLoad: 10, startDate: fetchingStartDate });

        if (restUpdates.status === 200) {
            if (restUpdates.data.length < 10) {
                setLoadMoreBtnLabel('no more to display');
            } else {
                setLoadMoreBtnLabel('load more');
            }
            setPureReportDT((prevvPureDT) => [...prevvPureDT, ...restUpdates.data]);
            setToLoadPage((prevNum) => prevNum + 1);
        }
    }

    useEffect(() => {
        formatReportData(pureReportDT);
    }, [pureReportDT]);

    useEffect(() => {

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        setFetchingStartDate(yesterday);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        (async function () {
            await fetchReportUpdates(yesterday, endOfToday);
        })();

    }, []);
    return (
        <div>
            {
                pureReportDT &&
                <CheckUserRole allowedRoles={['developer', 'viewer', 'admin', 'interpreter']}>
                    <Sidebar enableSearch={false} />
                    <Typography style={{ minHeight: "56px" }} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    </Typography>
                    {Object.keys(reportData).length > 0 ? Object.keys(reportData).map((objDate, ind) => (
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
                    )) : <div style={{ textAlign: "center", margin: "20px 0" }}>no updates for today</div>}
                    <div style={{ textAlign: "center" }}>
                        <Button
                            onClick={() => {
                                handleLoadMore()
                            }}
                            disabled={loadMoreBtnLabel === 'no more to display' || loadMoreBtnLabel === 'loading'}
                            style={{ backgroundColor: "#64CCC5" }}
                            endIcon={<ExpandMoreIcon />}
                            variant="contained"
                            size="small"
                        >
                            {loadMoreBtnLabel}
                        </Button>
                    </div>
                </CheckUserRole>
            }
        </div>
    )
}
