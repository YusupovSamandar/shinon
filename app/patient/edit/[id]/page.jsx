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
import axios from '@/app/axiosInstance';
import { API_URL } from '@/app/apiConfig';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CheckUserRole } from '@/app/routerGuard';
import SectionTitle from '@/app/components/section-title';

const defaultTheme = createTheme();

export default function EditPatient({ params }) {
    const router = useRouter()
    const patientID = params.id;
    const [currentPatientDetails, setCurrentPatientDetails] = React.useState(undefined);
    const [buttonLabel, setButtonLabel] = React.useState('edit patient');
    const [deleteLabel, setDeleteLabel] = React.useState('Delete Patient');

    // Visa States

    const [visaIssueDate, setVisaIssueDate] = React.useState('');
    const [dateofArrival, setDateofArrival] = React.useState('');
    const [visaExpireDate, setVisaExpireDateValue] = React.useState(dayjs('2022-04-17'));

    const [donorVisaExpireDate, setDonorVisaExpireDateValue] = React.useState(''); // donor
    const [donorVisaIssueDate, setDonorVisaIssueDate] = React.useState('');
    const [attendantVisaExpireDate, setAttendantVisaExpireDateValue] = React.useState(''); // Attendant
    const [attendantVisaIssueDate, setAttendantVisaIssueDate] = React.useState('');
    const [attendant2VisaExpireDate, setAttendant2VisaExpireDateValue] = React.useState(''); // Attendant2
    const [attendant2VisaIssueDate, setAttendant2VisaIssueDate] = React.useState('');

    const [committeeDate, setCommitteeDate] = React.useState('');
    const [admissionDate, setAdmissionDate] = React.useState('');
    const [surgeryDate, setSurgeryDate] = React.useState('');
    const [dischargeDate, setDischargeDate] = React.useState('');
    const [returnTicket, setReturnTicket] = React.useState(null);

    React.useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${API_URL}/api/patients/${patientID}`);
            setCurrentPatientDetails(data);

            const date = new Date(data.dateOfVisaExpiry);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            setVisaExpireDateValue(dayjs(formattedDate));
            setVisaIssueDate(dayjs(data.visaIssueDate));
            setDateofArrival(dayjs(data.dateofArrival));
            setDonorVisaExpireDateValue(dayjs(data.donorVisaExpireDate));
            setDonorVisaIssueDate(dayjs(data.donorVisaIssueDate));
            setAttendantVisaExpireDateValue(dayjs(data.attendantVisaExpireDate));
            setAttendantVisaIssueDate(dayjs(data.attendantVisaIssueDate));
            setAttendant2VisaExpireDateValue(dayjs(data.attendant2VisaExpireDate));
            setAttendant2VisaIssueDate(dayjs(data.attendant2VisaIssueDate));
            // other dates
            setCommitteeDate(dayjs(data.committeeDate));
            setAdmissionDate(dayjs(data.admissionDate));
            setSurgeryDate(dayjs(data.surgeryDate));
            setDischargeDate(dayjs(data.dischargeDate));
            setReturnTicket(dayjs(data.returnTicket));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleSubmit = (event) => {
        setButtonLabel("saving");
        const reformatDate = (dateObj) => {
            return `${dateObj.$y}-${("" + (dateObj.$M + 1)).padStart(2, '0')}-${("" + dateObj.$D).padStart(2, '0')}`;
        }
        event.preventDefault();
        const edittingObj = {
            ...currentPatientDetails,
            // dates
            dateOfVisaExpiry: reformatDate(visaExpireDate),
            visaIssueDate: reformatDate(visaIssueDate),
            dateofArrival: reformatDate(dateofArrival),
            donorVisaExpireDate: reformatDate(donorVisaExpireDate),
            donorVisaIssueDate: reformatDate(donorVisaIssueDate),
            attendantVisaExpireDate: reformatDate(attendantVisaExpireDate),
            attendantVisaIssueDate: reformatDate(attendantVisaIssueDate),
            attendant2VisaExpireDate: reformatDate(attendant2VisaExpireDate),
            attendant2VisaIssueDate: reformatDate(attendant2VisaIssueDate),
            // others dates
            committeeDate: reformatDate(committeeDate),
            admissionDate: reformatDate(admissionDate),
            surgeryDate: reformatDate(surgeryDate),
            dischargeDate: reformatDate(dischargeDate),
            returnTicket: reformatDate(returnTicket),

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
        setDeleteLabel("deleting...")
        const deleteResponse = await axios.delete(`${API_URL}/api/patients/${patientID}`);
        if (deleteResponse.status === 200) {
            setDeleteLabel("Delete Patient");
            router.push('/patients');
        } else {
            setDeleteLabel("Delete Patient");
        }
    }

    // const DownloadPassport = async () => {
    //     const pictureUrl = `${API_URL}${currentPatientDetails.patientPassport}`;
    //     const modifiedString = currentPatientDetails.patientPassport.replace("/uploads/passports/", "");
    //     axios.get(pictureUrl, {
    //         responseType: 'arraybuffer' // Specify responseType as 'arraybuffer' to handle binary data
    //     })
    //         .then((response) => {
    //             // Create a blob from the binary data
    //             const blob = new Blob([response?.data]);

    //             // Create a URL for the blob
    //             const url = window.URL.createObjectURL(blob);

    //             // Create a download link for the blob
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', modifiedString); // Specify the desired filename for the download
    //             document.body.appendChild(link);
    //             link.click();

    //             // Cleanup by revoking the blob URL
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch((error) => console.log(error));
    // }

    return (
        <CheckUserRole allowedRoles={['admin', 'developer']}>
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
                                <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1 }}>
                                    <SectionTitle value={"Patient"} />
                                    <section>
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
                                            required
                                            fullWidth
                                            value={currentPatientDetails.patientUHID}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, patientUHID: e.target.value }
                                                });
                                                setButtonLabel("Confirm");
                                            }}
                                            id="patientUHID"
                                            label="Patient's UHID"
                                            name="patientUHID"

                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={currentPatientDetails.passportNumber}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, passportNumber: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            id="passportNumber"
                                            label="Patient's passport Number"
                                            name="passportNumber"

                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={currentPatientDetails.doctorDetails}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, doctorDetails: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            id="doctorDetails"
                                            label="Patient's doctor Details"
                                            name="doctorDetails"

                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={currentPatientDetails.country}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, country: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            id="country"
                                            label="Patient's Country"
                                            name="country"

                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={currentPatientDetails.hospital}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, hospital: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            id="hospital"
                                            label="Patient's Hospital"
                                            name="hospital"

                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={currentPatientDetails.speciality}
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, speciality: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            id="speciality"
                                            label="Patient's Speciality"
                                            name="speciality"

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
                                            label="Visa Issue Date"
                                            value={visaIssueDate}
                                            onChange={(newValue) => {
                                                setVisaIssueDate(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Date of Arrival"
                                            value={dateofArrival}
                                            onChange={(newValue) => {
                                                setDateofArrival(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                    </section>

                                    <SectionTitle value={"Donor"} />
                                    <section>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, nameOfDonor: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            value={currentPatientDetails.nameOfDonor}
                                            name="donor"
                                            label="Donor's Name"
                                            id="donor"
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, donorUHID: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            value={currentPatientDetails.donorUHID}
                                            name="donorUHID"
                                            label="Donor's UHID"
                                            id="donorUHID"
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, donorPassportNumber: e.target.value }
                                                });
                                                setButtonLabel("Confirm");

                                            }}
                                            value={currentPatientDetails.donorPassportNumber}
                                            name="donorPassportNumber"
                                            label="Donor's Passport Number"
                                            id="donorPassportNumber"
                                        />

                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Donor Visa Expire Date"
                                            value={donorVisaExpireDate}
                                            onChange={(newValue) => {
                                                setDonorVisaExpireDateValue(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Donor Visa Issue Date"
                                            value={donorVisaIssueDate}
                                            onChange={(newValue) => {
                                                setDonorVisaIssueDate(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                    </section>
                                    <SectionTitle value={"Attendant 1"} />
                                    <section>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, nameOfAttendant: e.target.value }
                                                });
                                                setButtonLabel("Confirm");
                                            }}
                                            value={currentPatientDetails.nameOfAttendant}
                                            name="nameOfAttendant"
                                            label="Attendant's Name"
                                            id="nameOfAttendant"
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, attendantPassportNumber: e.target.value }
                                                });
                                                setButtonLabel("Confirm");
                                            }}
                                            value={currentPatientDetails.attendantPassportNumber}
                                            name="attendantPassportNumber"
                                            label="Attendant's Passport Number"
                                            id="attendantPassportNumber"
                                        />

                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Attendant Visa Expire Date"
                                            value={attendantVisaExpireDate}
                                            onChange={(newValue) => {
                                                setAttendantVisaExpireDateValue(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Attendant Visa Issue Date"
                                            value={attendantVisaIssueDate}
                                            onChange={(newValue) => {
                                                setAttendantVisaIssueDate(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                    </section>
                                    <SectionTitle value={"Attendant 2"} />
                                    <section>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, nameOfAttendant2: e.target.value }
                                                });
                                                setButtonLabel("Confirm");
                                            }}
                                            value={currentPatientDetails.nameOfAttendant2}
                                            name="nameOfAttendant2"
                                            label="Second Attendant's Name"
                                            id="nameOfAttendant2"
                                        />
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            onChange={(e) => {
                                                setCurrentPatientDetails((prev) => {
                                                    return { ...prev, attendant2PassportNumber: e.target.value }
                                                });
                                                setButtonLabel("Confirm");
                                            }}
                                            value={currentPatientDetails.attendantPassportNumber}
                                            name="attendant2PassportNumber"
                                            label="Second Attendant's Passport Number"
                                            id="attendant2PassportNumber"
                                        />

                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Second Attendant Visa Expire Date"
                                            value={attendant2VisaExpireDate}
                                            onChange={(newValue) => {
                                                setAttendant2VisaExpireDateValue(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Second Attendant Visa Issue Date"
                                            value={attendant2VisaIssueDate}
                                            onChange={(newValue) => {
                                                setAttendant2VisaIssueDate(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                    </section>

                                    <SectionTitle value={"Other Dates"} />
                                    <section>

                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Committee Date"
                                            value={committeeDate}
                                            onChange={(newValue) => {
                                                setCommitteeDate(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Admission Date"
                                            value={admissionDate}
                                            onChange={(newValue) => {
                                                setAdmissionDate(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="surgery Date"
                                            value={surgeryDate}
                                            onChange={(newValue) => {
                                                setSurgeryDate(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Discharge Date"
                                            value={dischargeDate}
                                            onChange={(newValue) => {
                                                setDischargeDate(newValue);
                                                setButtonLabel("Confirm");
                                            }}
                                        />
                                        <DatePicker
                                            sx={{ margin: "16px 0 8px 0" }}
                                            margin="normal"
                                            label="Return Ticket"
                                            value={returnTicket}
                                            onChange={(newValue) => {
                                                setReturnTicket(newValue)
                                                setButtonLabel("Confirm");
                                            }}
                                        />

                                    </section>
                                    <br />
                                    {
                                        currentPatientDetails.patientPassport !== "none" && <Button
                                            variant="contained"
                                            sx={{ mt: 2, mb: 1 }}
                                        // onClick={DownloadPassport}
                                        >   <a href={API_URL + currentPatientDetails.patientPassport}>
                                                <CloudDownloadIcon fontSize='small' style={{ marginRight: "10px" }} />      passport
                                            </a>
                                        </Button>
                                    }


                                    <Button
                                        type="submit"
                                        fullWidth
                                        disabled={buttonLabel === 'edit patient' || buttonLabel === 'updated!' || buttonLabel === "saving"}
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
                                        {deleteLabel}
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </div>
                }
            </ThemeProvider>
        </CheckUserRole>
    );
}