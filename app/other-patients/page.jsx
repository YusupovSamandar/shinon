"use client"
import React, { useEffect, useState } from 'react';
import PatientLists from "../components/normalUsersList";
import SideBar from "../components/sidebarToggle";
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { setValue } from "../redux/features/searchValue-slice";
import { CheckUserRole } from '../routerGuard';
import axios from "@/app/axiosInstance";
import { API_URL } from "@/app/apiConfig";


export default function Patients() {
    const currentUser = useSelector((state) => state.userAuth);

    const [otherPatients, setOtherPatients] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setValue(""));
      if (currentUser.isAuth) {
          (async function () {
            const { data } = await axios.get(
              `${API_URL}/api/patients/other/${currentUser.value.hospital}`
            );
            setOtherPatients(data);
          })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
      <div>
        <CheckUserRole
          allowedRoles={["developer", "viewer", "admin"]}
        >
          <SideBar enableSearch={true} />
          <Typography
            style={{ minHeight: "56px" }}
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          ></Typography>
          <PatientLists list={otherPatients} secondary={"currentStatus"} />
          <div style={{ height: "50px" }}></div>
        </CheckUserRole>
      </div>
    );
}
