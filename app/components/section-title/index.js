import React from 'react'
import Typography from '@mui/material/Typography';

export default function Section({ value }) {
    return (
        <div>
            <Typography component={'div'} style={{ display: "flex", alignItems: "center", gap: "10px" }} gutterBottom>
                <div style={{ backgroundColor: "#333", width: "10px", height: "1px" }}></div>
                <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}><i>{value}</i></p>
            </Typography>

        </div>
    )
}
