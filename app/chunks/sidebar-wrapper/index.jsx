import React from "react";
import SideBar from "@/app/components/sidebarToggle";
import Typography from "@mui/material/Typography";

export default function SidabarWrapper({ enableSearch, children }) {
  return (
    <div>
      <SideBar enableSearch={enableSearch} />
      <Typography
        style={{ minHeight: "56px" }}
        variant="h5"
        gutterBottom
        component="div"
        sx={{ p: 2, pb: 0 }}
      ></Typography>
      {children}
    </div>
  );
}
