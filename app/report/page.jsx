"use client"
import React, { useEffect, useState } from 'react';
import ReportMessage from '@/app/components/reportList';

export default function Report() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const data = [
            {
                patient: "Bekzod Jumayev",
                reporter: "Samandar Yusupov",
                message: "feeling good Do you have Paris recommendations? Have you ever"
            },
            {
                patient: "Jamshid Jumayev",
                reporter: "Qosim Yusupov",
                message: "Wish I could come, but I'm out of town this. "
            },
            {
                patient: "Sardor Jumayev",
                reporter: "Jorabek Yusupov",
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga blanditiis voluptatem iste saepe veritatis error."
            }
        ]
        setReportData(data);
    }, []);
    return (
        <div>
            <ReportMessage reportList={reportData} />
        </div>
    )
}
