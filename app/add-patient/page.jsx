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
    const [visaExpireDate, setVisaExpireDateValue] = React.useState(dayjs('2022-04-17'));
    const [imageUrl, setImageUrl] = React.useState(null);
    const [passportImg, setPassportImg] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
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
                            id="name"
                            label="Patient's Full Name"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
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
                        <p>Patient Image:</p>
                        <UploadButtons receivedImg={imageUrl} setReceivedImg={setImageUrl} customID={"patient-upload"} />
                        <br />
                        <p>Passport Image:</p>
                        <UploadButtons receivedImg={passportImg} setReceivedImg={setPassportImg} customID={"passport-upload"} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}