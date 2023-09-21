"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ImgButton from '@/app/components/imgButton';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import Link from 'next/link';
import Stack from "@mui/material/Stack";
import axios from '@/app/axiosInstance';
import { API_URL } from '../apiConfig';
import { CheckUserRole } from '../routerGuard';

function UploadButtons({ receivedImg, setReceivedImg, customID }) {

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setReceivedImg(file);
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor={customID}>
                <ImgButton currentImage={{
                    url: receivedImg,
                    title: receivedImg ? 'changeImage' : 'select image',
                }} />
                <input
                    id={customID}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                />
            </label>
        </Stack>
    );
}



const defaultTheme = createTheme();

export default function AddPatient() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [visaExpireDate, setVisaExpireDateValue] = React.useState(dayjs(formattedDate));
    const [returnTicket, setReturnTicket] = React.useState(dayjs(formattedDate));

    const [imageUrl, setImageUrl] = React.useState(null);
    const [passportImg, setPassportImg] = React.useState(null);

    const [patientDetails, setPatientDetails] = React.useState({ fullName: '', nameOfDonor: '' });
    const [buttonLabel, setButtonLabel] = React.useState("confirm")

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (patientDetails.fullName.length < 1 || patientDetails.nameOfDonor.length < 1) {
            alert("fill in the form first")
            return;
        }
        const formattedVisaExpireDate = `${visaExpireDate.$y}-${("" + (visaExpireDate.$M + 1)).padStart(2, '0')}-${("" + visaExpireDate.$D).padStart(2, '0')}`;
        const formattedReturnTicket = `${returnTicket.$y}-${("" + (returnTicket.$M + 1)).padStart(2, '0')}-${("" + returnTicket.$D).padStart(2, '0')}`;

        const formData = new FormData();
        formData.append('fullName', patientDetails.fullName);
        formData.append('nameOfDonor', patientDetails.nameOfDonor);
        formData.append('dateOfVisaExpiry', formattedVisaExpireDate);
        formData.append('returnTicket', formattedReturnTicket);
        if (imageUrl) {
            formData.append('patientPicture', imageUrl)
        }
        if (passportImg) {
            formData.append('patientPassport', passportImg)
        }

        setButtonLabel("saving...")
        const saveResponse = await axios.post(`${API_URL}/api/patients`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (saveResponse.status === 200) {
            setButtonLabel("saved!");
            // reset
            setPatientDetails({ fullName: '', nameOfDonor: '' });
            setImageUrl(null);
            setPassportImg(null)
            setTimeout(() => {
                setButtonLabel('Confirm');
            }, 2000);
        }
    };

    return (
        <CheckUserRole allowedRoles={['admin', 'developer']}>
            <ThemeProvider theme={defaultTheme}>
                <Link href="/patients">
                    <IconButton aria-label="delete" size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add New Patient
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={patientDetails.fullName}
                                onChange={(e) => {
                                    setPatientDetails((prev) => {
                                        return { ...prev, fullName: e.target.value }
                                    });
                                }}
                                id="fullName"
                                label="Patient's Full Name"
                                name="fullName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                onChange={(e) => {
                                    setPatientDetails((prev) => {
                                        return { ...prev, nameOfDonor: e.target.value }
                                    });
                                }}
                                value={patientDetails.nameOfDonor}
                                name="donor"
                                label="Donor's Name"
                                id="donor"
                            />
                            <DatePicker
                                sx={{ margin: "16px 0 8px 0" }}
                                margin="normal"
                                label="Visa Expiration Date"
                                value={visaExpireDate}
                                onChange={(newValue) => setVisaExpireDateValue(newValue)}
                            />
                            <DatePicker
                                sx={{ margin: "16px 0 8px 0" }}
                                margin="normal"
                                label="Return Ticket"
                                value={returnTicket}
                                onChange={(newValue) => setReturnTicket(newValue)}
                            />
                            <p>Patient Image:</p>
                            <UploadButtons receivedImg={imageUrl} setReceivedImg={setImageUrl} customID={"patient-upload"} />
                            <br />
                            <p>Passport Image:</p>
                            <UploadButtons receivedImg={passportImg} setReceivedImg={setPassportImg} customID={"passport-upload"} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={buttonLabel === "saved!"}
                                color={buttonLabel === "saved!" ? 'success' : 'primary'}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {buttonLabel}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </CheckUserRole>
    );
}