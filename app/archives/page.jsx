"use client"
import React, { useEffect, useState } from 'react';
import PatientLists from "./../components/normalUsersList";
import SideBar from "./../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { setValue } from "./../redux/features/searchValue-slice";
import { CheckUserRole } from '../routerGuard';
import { API_URL } from "@/app/apiConfig";
import axios from "@/app/axiosInstance";


export default function Patients() {
    const currentUser = useSelector((state) => state.userAuth);
    
    const [completePatients, setCompletePatients] = useState([]);
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setValue(""));
       (async function () {
         const { data } = await axios.get(
           `${API_URL}/api/patients/complete/all`
         );
         setCompletePatients(data);
       })();
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
          <PatientLists list={completePatients} />
          <div style={{ height: "50px" }}></div>
        </CheckUserRole>
      </div>
    );
}
