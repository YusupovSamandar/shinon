import React from 'react';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import Link from "next/link";

export default function Restricted() {
    return (
        <div style={{ textAlign: "center", position: "absolute", top: "30vh", padding: "10px", margin: '0 auto', width: '100%' }}>
            <LockIcon color='action' style={{ fontSize: "4rem" }} />
            <Typography variant="h5" gutterBottom>
                {"You don't have permission to view this page"}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                please <Link href={"/login"} style={{ color: "blue" }}>login</Link> to view this page
            </Typography>
        </div>
    )
}
