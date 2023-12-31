"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { updateValue } from '@/app/redux/features/patientsList-slice';
import { setValue } from '@/app/redux/features/searchValue-slice';
import NotificationIconBtn from "@/app/chunks/notificationIcon"



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));
export default function TopBar({ openDrawer, toggleSearch }) {
    const warningMsgs = useSelector((state) => state.warningMessagesList.value);

    const dispach = useDispatch();
    const searchPatient = (e) => {
        dispach(updateValue(e.target.value));
        dispach(setValue(e.target.value));
    }

    return (
        <AppBar position="fixed" color="primary" sx={{ bottom: 'auto' }}>
            <Toolbar style={{ justifyContent: "space-between", minHeight: "56px" }}>
                <IconButton onClick={openDrawer} color="inherit" aria-label="open drawer">
                    <MenuIcon />
                </IconButton>
                {/* <Box sx={{ flexGrow: 1 }} /> */}
                {
                    toggleSearch && <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={searchPatient}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                }
                <NotificationIconBtn number={warningMsgs.length} />
            </Toolbar>
        </AppBar >
    )
}
