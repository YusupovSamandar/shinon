"use client";
import React, { useEffect } from "react";
import BottomListBar from "./../components/patietsList";
import SideBar from "./../components/sidebarToggle";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import BottomFilterBar from "@/app/components/bottomFilterBar";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MedicationIcon from "@mui/icons-material/Medication";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { fetchPatients } from "./../redux/features/patientsList-slice";
import { CheckUserRole } from "../routerGuard";

export default function Patients() {
  const currentUser = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.isAuth) {
      dispatch(fetchPatients(currentUser.value.hospital));
    }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div>
      <CheckUserRole
        allowedRoles={["developer", "viewer", "admin", "interpreter"]}
      >
        <SideBar enableSearch={true} />
        <Typography
          style={{ minHeight: "56px" }}
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        ></Typography>
        <BottomListBar />
        <div style={{ height: "50px" }}></div>
        <BottomFilterBar
          item1={{ label: "Pre-Work up", icon: <ShowChartIcon /> }}
          item2={{ label: "Surgery", icon: <VaccinesIcon /> }}
          item3={{ label: "Post Surgery", icon: <AirlineSeatFlatIcon /> }}
          item4={{
            label: "Post tx follow up updates",
            icon: <MedicationIcon />,
          }}
        />
      </CheckUserRole>
    </div>
  );
}
