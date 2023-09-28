import React from 'react';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export default function Restricted() {
   return (
      <div style={{ textAlign: "center", position: "absolute", top: "30vh", padding: "10px", margin: '0 auto', width: '100%' }}>
         <Typography variant="h4" gutterBottom>
            {"404"}
         </Typography>
         <Typography variant="h5" gutterBottom>
            {"Page not Found"}
         </Typography>
         <Typography variant="subtitle2" gutterBottom>
            please go back to <Link href={"/patients"} style={{ color: "blue" }}>HOME</Link>
         </Typography>
      </div>
   )
}
