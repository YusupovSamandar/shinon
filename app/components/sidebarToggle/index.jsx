"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TopBar from "./../topAppBar";
import { useRouter } from 'next/navigation';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { API_URL } from '@/app/apiConfig';
import axios from '@/app/axiosInstance';
import SickIcon from '@mui/icons-material/Sick';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Groups3Icon from '@mui/icons-material/Groups3';

export default function SwipeableTemporaryDrawer({ enableSearch }) {
  const [state, setState] = React.useState(false);
  const router = useRouter()


  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: "70vw" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div style={{ marginLeft: "16px" }}>
        <br />
        <Avatar
          sx={{ width: 60, height: 60, margin: "10px 0" }}
          alt="Samandar"
          src="/static/images/avatar/2.jpg"
        />
        <Typography component="div">Samandar Yusupov</Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary">
          interpreter
        </Typography>
        <br />
      </div>
      <Divider />
      <List>
        {[
          { label: "My patients", goto: "/patients", icon: <SickIcon /> },
          {
            label: "Notifications",
            goto: "/notifications",
            icon: <NotificationsActiveIcon />,
          },
          { label: "Report", goto: "/report", icon: <SummarizeIcon /> },
          { label: "Users", goto: "/users", icon: <GroupIcon /> },
          {
            label: "Hospitals",
            goto: "/hospitals",
            icon: <LocationCityIcon />,
          },
          {
            label: "Other Patients",
            goto: "/other-patients",
            icon: <Groups3Icon />,
          },
          {
            label: "Complete Patients",
            goto: "/archives",
            icon: <Diversity1Icon />,
          },
          { label: "Logout", goto: "/login", icon: <LogoutIcon /> },
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if (text.goto === "/login") {
                  (async function () {
                    const logoutResponse = await axios.post(
                      `${API_URL}/api/users/logout`
                    );
                    if (logoutResponse.status === 204) {
                      localStorage.removeItem("currentUserID");
                      router.push(text.goto);
                    }
                  })();
                } else {
                  router.push(text.goto);
                }
              }}
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>

          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>

        <TopBar toggleSearch={enableSearch} openDrawer={toggleDrawer(true)} />

        <SwipeableDrawer
          anchor={'left'}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}