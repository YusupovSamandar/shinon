"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from '@/app/axiosInstance';
import { API_URL } from '@/app/apiConfig';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from '@/app/redux/features/users-slice';
const defaultTheme = createTheme();

export default function AddUser({ setCurrentTab }) {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = React.useState({ login: '', password: '' });
    const [userRole, setUserRole] = React.useState('viewer');
    const [addButtonTxt, setAddButtonTxt] = React.useState('Add New User');

    const saveNewUser = async () => {
        setAddButtonTxt("Saving...");
        const response = await axios.post(`${API_URL}/api/users`, { login: newUser.login.trim(), password: newUser.password.trim(), role: userRole });
        if (response.status === 200) {
            setAddButtonTxt("Add New User");
            dispatch(fetchAllUsers());
            setCurrentTab(0);

        } else if (response.status === 400) {
            alert('This User Already Exists');
        } else {
            alert('error saving user');
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        saveNewUser();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add New User
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }} autoComplete="off">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={newUser.login}
                            onChange={(e) => {
                                setNewUser((prev) => {
                                    return { ...prev, login: e.target.value };
                                })
                            }}
                            id="login"
                            label="New User Login"
                            name="login"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            value={newUser.password}
                            onChange={(e) => {
                                setNewUser((prev) => {
                                    return { ...prev, password: e.target.value };
                                })
                            }}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />

                        <InputLabel id="demo-simple-select-label">role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userRole}
                            label="Age"
                            onChange={(event) => {
                                setUserRole(event.target.value)
                            }}
                        >
                            <MenuItem value={'viewer'}>viewer</MenuItem>
                            <MenuItem value={'interpreter'}>interpreter</MenuItem>
                            <MenuItem value={'admin'}>admin</MenuItem>
                            <MenuItem value={'developer'}>developer</MenuItem>
                        </Select>

                        <Button
                            disabled={addButtonTxt === "Saving..."}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {addButtonTxt}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}