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
import dayjs from 'dayjs';
import Image from 'next/image';
import Stack from "@mui/material/Stack";

function UploadButtons() {
    const [imageUrl, setImageUrl] = React.useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setImageUrl(file);
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                    Upload
                </Button>
                <input
                    id="upload-image"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                />
            </label>
            {imageUrl && <Image src={URL.createObjectURL(imageUrl)} width={100} alt="Uploaded Image" height="100" />}
        </Stack>
    );
}



const defaultTheme = createTheme();

export default function SignIn() {
    const [visaExpireDate, setVisaExpireDateValue] = React.useState(dayjs('2022-04-17'));

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
                        Sign in
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
                        <p>
                            Patient Image:
                        </p>
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <ImgButton />
                        <UploadButtons />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}