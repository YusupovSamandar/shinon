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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/app/apiConfig';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { saveAs } from 'file-saver'

const defaultTheme = createTheme();

export default function EditPatient({ params }) {
    const router = useRouter()
    const patientID = params.id;
    const [currentPatientDetails, setCurrentPatientDetails] = React.useState(undefined);
    const [visaExpireDate, setVisaExpireDateValue] = React.useState(dayjs('2022-04-17'));
    const [returnTicket, setReturnTicket] = React.useState(null);
    const [buttonLabel, setButtonLabel] = React.useState('edit patient');

    React.useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/patients/${patientID}`);
            setCurrentPatientDetails(data);

            const date = new Date(data.dateOfVisaExpiry);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            setReturnTicket(dayjs(data.returnTicket));

            setVisaExpireDateValue(dayjs(formattedDate));
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleSubmit = (event) => {
        setButtonLabel("saving");
        const formattedVisaExpireDate = `${visaExpireDate.$y}-${("" + (visaExpireDate.$M + 1)).padStart(2, '0')}-${("" + visaExpireDate.$D).padStart(2, '0')}`;
        const formattedReturnTicket = `${returnTicket.$y}-${("" + (returnTicket.$M + 1)).padStart(2, '0')}-${("" + returnTicket.$D).padStart(2, '0')}`;
        event.preventDefault();
        const edittingObj = {
            fullName: currentPatientDetails.fullName,
            nameOfDonor: currentPatientDetails.nameOfDonor,
            dateOfVisaExpiry: formattedVisaExpireDate,
            returnTicket: formattedReturnTicket
        };
        (async function () {
            const editResponse = await axios.put(`${API_URL}/api/patients/${patientID}`, edittingObj);
            if (editResponse.status === 200) {
                setButtonLabel("updated!");
                setTimeout(() => {
                    setButtonLabel("edit patient");
                }, 2000);
            }
        })();
    };

    const deletePatient = async () => {
        const deleteResponse = await axios.delete(`${API_URL}/api/patients/${patientID}`);
        if (deleteResponse.status === 200) {
            router.push('/patients');
        }
    }

    const DownloadPassport = async () => {
        const pictureUrl = `${API_URL}${currentPatientDetails.patientPassport}`;
        const modifiedString = currentPatientDetails.patientPassport.replace("/uploads/passports/", "");
        axios.get(pictureUrl, {
            responseType: 'arraybuffer', // Specify responseType as 'arraybuffer' to handle binary data
        })
            .then((response) => {
                // Create a blob from the binary data
                const blob = new Blob([response.data]);

                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a download link for the blob
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', modifiedString); // Specify the desired filename for the download
                document.body.appendChild(link);
                link.click();

                // Cleanup by revoking the blob URL
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => console.log(error));
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            {
                currentPatientDetails &&
                <div>
                    <Link href={"/patient/" + patientID}>
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
                                <EditIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Edit Patient
                            </Typography>
                            <br /><br />
                            {
                                currentPatientDetails.patientPicture !== "none" && <Avatar sx={{ width: 50, height: 50 }} alt={currentPatientDetails.fullName} src={`${API_URL}${currentPatientDetails.patientPicture}`} />
                            }
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={currentPatientDetails.fullName}
                                    onChange={(e) => {
                                        setCurrentPatientDetails((prev) => {
                                            return { ...prev, fullName: e.target.value }
                                        });
                                        setButtonLabel("Confirm");
                                    }}
                                    id="fullName"
                                    label="Patient's Full Name"
                                    name="fullName"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    value={currentPatientDetails.nameOfDonor}
                                    onChange={(e) => {
                                        setCurrentPatientDetails((prev) => {
                                            return { ...prev, nameOfDonor: e.target.value }
                                        });
                                        setButtonLabel("Confirm");
                                    }}
                                    name="donor"
                                    label="Donor's Name"
                                    id="donor"
                                />
                                <DatePicker
                                    sx={{ margin: "16px 0 8px 0" }}
                                    margin="normal"
                                    label="Visa Expiration Date"
                                    value={visaExpireDate}
                                    onChange={(newValue) => {
                                        setVisaExpireDateValue(newValue)
                                        setButtonLabel("Confirm");
                                    }}
                                />
                                <DatePicker
                                    sx={{ margin: "16px 0 8px 0" }}
                                    margin="normal"
                                    label="Visa Expiration Date"
                                    value={returnTicket}
                                    onChange={(newValue) => {
                                        setReturnTicket(newValue)
                                        setButtonLabel("Confirm");
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={DownloadPassport}
                                >
                                    <CloudDownloadIcon fontSize='small' style={{ marginRight: "10px" }} />      passport
                                </Button>

                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={buttonLabel === 'edit patient' || buttonLabel === 'updated!'}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {buttonLabel}
                                </Button>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        if (
                                            !confirm(`Are you sure you want to delete ${currentPatientDetails.fullName}`)
                                        ) {
                                            return;
                                        }
                                        deletePatient();

                                    }}
                                >
                                    Delete Patient
                                </Button>
                            </Box>
                        </Box>
                    </Container>

                </div>
            }

        </ThemeProvider >
    );
}