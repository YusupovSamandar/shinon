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
import TopBar from "./../topAppBar";
import { useRouter } from 'next/navigation';
import SickIcon from '@mui/icons-material/Sick';

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
      sx={{ width: '70vw' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div style={{ marginLeft: '16px' }}>
        <br />
        <Avatar sx={{ width: 60, height: 60, margin: "10px 0" }} alt="Samandar" src="/static/images/avatar/2.jpg" />
        <Typography component="div">
          Samandar Yusupov
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary">
          interpreter
        </Typography>
        <br />
      </div>
      <Divider />
      <List>
        {['Patients', 'Users', "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {
              router.push(index === 0 ? '/patients' : index === 1 ? '/users' : '/login')
            }}>
              <ListItemIcon>
                {index === 0 ? <SickIcon /> : index === 1 ? <GroupIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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