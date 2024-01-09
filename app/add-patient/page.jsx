"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import ImgButton from "@/app/components/imgButton";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import axios from "@/app/axiosInstance";
import { API_URL } from "../apiConfig";
import { CheckUserRole } from "../routerGuard";
import SectionTitle from "../components/section-title";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function UploadButtons({ receivedImg, setReceivedImg, customID, acceptFiles }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setReceivedImg(file);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor={customID}>
        <ImgButton
          acceptFiles={acceptFiles}
          currentImage={{
            url: receivedImg,
            title: receivedImg
              ? "change file"
              : acceptFiles === ".pdf"
              ? receivedImg?.name || "select pdf file"
              : "select image",
          }}
        />
        {acceptFiles === ".pdf" && (
          <p style={{ width: "150px" }}>
            chosen file: {receivedImg?.name || "none"}
          </p>
        )}

        <input
          id={customID}
          hidden
          accept={acceptFiles}
          type="file"
          onChange={handleFileUpload}
        />
      </label>
    </Stack>
  );
}

const defaultTheme = createTheme();

export default function AddPatient() {
  const [hospitalsList, setHospitalsList] = React.useState([]); // patient
  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${API_URL}/api/hospitals`);
      setHospitalsList(data);
    })();
  }, []);
  const router = useRouter();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const todaysDayJs = dayjs(formattedDate);
  // Visa States

  const [visaExpireDate, setVisaExpireDateValue] = React.useState(todaysDayJs); // patient
  const [visaIssueDate, setVisaIssueDate] = React.useState(todaysDayJs);
  const [dateofArrival, setDateofArrival] = React.useState(todaysDayJs);

  const [donorVisaExpireDate, setDonorVisaExpireDateValue] =
    React.useState(todaysDayJs); // donor
  const [donorVisaIssueDate, setDonorVisaIssueDate] =
    React.useState(todaysDayJs);
  const [attendantVisaExpireDate, setAttendantVisaExpireDateValue] =
    React.useState(todaysDayJs); // Attendant
  const [attendantVisaIssueDate, setAttendantVisaIssueDate] =
    React.useState(todaysDayJs);
  const [attendant2VisaExpireDate, setAttendant2VisaExpireDateValue] =
    React.useState(todaysDayJs); // Attendant2
  const [attendant2VisaIssueDate, setAttendant2VisaIssueDate] =
    React.useState(todaysDayJs);

  // otherDates
  const [committeeDate, setCommitteeDate] = React.useState(todaysDayJs);
  const [admissionDate, setAdmissionDate] = React.useState(todaysDayJs);
  const [surgeryDate, setSurgeryDate] = React.useState(todaysDayJs);
  const [returnTicket, setReturnTicket] = React.useState(todaysDayJs);
  const [dischargeDate, setDischargeDate] = React.useState(todaysDayJs);

  const [imageUrl, setImageUrl] = React.useState(null);
  const [passportImg, setPassportImg] = React.useState(null);

  const initialPatientSchema = {
    fullName: "",
    patientUHID: "",
    donorUHID: "",
    visaType: "",
    phoneNumber: "",
    nameOfDonor: "",
    nameOfAttendant: "",
    nameOfAttendant2: "",
    passportNumber: "",
    donorPassportNumber: "",
    attendantPassportNumber: "",
    attendant2PassportNumber: "",
    country: "",
    hospital: "",
    speciality: "",
    doctorDetails: "",
  };

  const [patientDetails, setPatientDetails] =
    React.useState(initialPatientSchema);
  const [thisPTType, setThisPTType] = React.useState("transplant");
  const [buttonLabel, setButtonLabel] = React.useState("confirm");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonLabel("saving...");

    function reformatDate(dayjsDate) {
      return `${dayjsDate.$y}-${("" + (dayjsDate.$M + 1)).padStart(2, "0")}-${(
        "" + dayjsDate.$D
      ).padStart(2, "0")}`;
    }

    const formatVisaExpireDate = (date) => {
      const chosenDate = new Date(reformatDate(date));
      chosenDate.setHours(23, 59, 59, 999);
      return chosenDate.toISOString();
    };

    const formData = new FormData();
    formData.append("fullName", patientDetails.fullName.trim());
    formData.append("typeOfPatient", thisPTType);
    formData.append("nameOfDonor", patientDetails.nameOfDonor.trim());
    formData.append("patientUHID", patientDetails.patientUHID.trim());
    formData.append("visaType", patientDetails.visaType.trim());
    formData.append("donorUHID", patientDetails.donorUHID.trim());
    formData.append("nameOfAttendant", patientDetails.nameOfAttendant.trim());
    formData.append("nameOfAttendant2", patientDetails.nameOfAttendant2.trim());
    formData.append("passportNumber", patientDetails.passportNumber.trim());
    formData.append(
      "donorPassportNumber",
      patientDetails.donorPassportNumber.trim()
    );
    formData.append(
      "attendantPassportNumber",
      patientDetails.attendantPassportNumber.trim()
    );
    formData.append(
      "attendant2PassportNumber",
      patientDetails.attendant2PassportNumber.trim()
    );
    formData.append("country", patientDetails.country.trim());
    formData.append("hospital", patientDetails.hospital.trim());
    formData.append("speciality", patientDetails.speciality.trim());
    formData.append("doctorDetails", patientDetails.doctorDetails.trim());
    // dates
    formData.append("dateOfVisaExpiry", formatVisaExpireDate(visaExpireDate));
    formData.append("visaIssueDate", reformatDate(visaIssueDate));
    formData.append("dateofArrival", reformatDate(dateofArrival));
    formData.append("donorVisaExpireDate", reformatDate(donorVisaExpireDate));
    formData.append("donorVisaIssueDate", reformatDate(donorVisaIssueDate));
    formData.append(
      "attendantVisaExpireDate",
      reformatDate(attendantVisaExpireDate)
    );
    formData.append(
      "attendantVisaIssueDate",
      reformatDate(attendantVisaIssueDate)
    );
    formData.append(
      "attendant2VisaExpireDate",
      reformatDate(attendant2VisaExpireDate)
    );
    formData.append(
      "attendant2VisaIssueDate",
      reformatDate(attendant2VisaIssueDate)
    );
    //other dates
    formData.append("committeeDate", reformatDate(committeeDate));
    formData.append("admissionDate", reformatDate(admissionDate));
    formData.append("surgeryDate", reformatDate(surgeryDate));
    formData.append("dischargeDate", reformatDate(dischargeDate));
    formData.append("returnTicket", reformatDate(returnTicket));

    if (imageUrl) {
      formData.append("patientPicture", imageUrl);
    }
    if (passportImg) {
      formData.append("patientPassport", passportImg);
    }

    const saveResponse = await axios.post(`${API_URL}/api/patients`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (saveResponse.status === 200) {
      setButtonLabel("saved!");
      // reset
      setPatientDetails(initialPatientSchema);
      setImageUrl(null);
      setPassportImg(null);
      setTimeout(() => {
        router.push("/patients");
        setButtonLabel("Confirm");
      }, 2000);
    }
  };

  return (
    <CheckUserRole allowedRoles={["admin", "developer", "interpreter"]}>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Patient
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate={false}
              sx={{ mt: 1 }}
              autoComplete="off"
            >
              <SectionTitle value={"Patient"} />
              <section>
                <InputLabel id="patient-type-label">Patient type</InputLabel>
                <Select
                  labelId="patient-type-label"
                  id="patient-type"
                  value={thisPTType}
                  fullWidth
                  label="Patient Type"
                  onChange={(e) => {
                    setThisPTType(e.target.value);
                  }}
                >
                  <MenuItem value={"transplant"}>Transplant</MenuItem>
                  <MenuItem value={"non-transplant"}>Non-Transplant</MenuItem>
                </Select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.fullName}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, fullName: e.target.value };
                    });
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
                  value={patientDetails.patientUHID}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, patientUHID: e.target.value };
                    });
                  }}
                  id="patientUHID"
                  label="Patient's UHID"
                  name="patientUHID"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.passportNumber}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, passportNumber: e.target.value };
                    });
                  }}
                  id="passportNumber"
                  label="Patient's passport Number"
                  name="passportNumber"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.doctorDetails}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, doctorDetails: e.target.value };
                    });
                  }}
                  id="doctorDetails"
                  label="Patient's doctor Details"
                  name="doctorDetails"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.country}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, country: e.target.value };
                    });
                  }}
                  id="country"
                  label="Patient's Country"
                  name="country"
                />
                <FormControl fullWidth>
                  <InputLabel id="hospital-name-label">
                    Patient&apos;s Hospital
                  </InputLabel>
                  <Select
                    labelId="hospital-name-label"
                    id="hospital-name"
                    value={patientDetails.hospital}
                    fullWidth
                    required
                    label="Patient's Hospital"
                    onChange={(e) => {
                      setPatientDetails((prev) => {
                        return { ...prev, hospital: e.target.value };
                      });
                    }}
                  >
                    {hospitalsList.map((hosp) => (
                      <MenuItem key={hosp} value={hosp.hospitalName}>
                        {hosp.hospitalName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.speciality}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, speciality: e.target.value };
                    });
                  }}
                  id="speciality"
                  label="Patient's Speciality"
                  name="speciality"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={patientDetails.visaType}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, visaType: e.target.value };
                    });
                  }}
                  id="visaType"
                  label="Patient's Visa Type"
                  name="visaType"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  value={patientDetails.phoneNumber}
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, phoneNumber: e.target.value };
                    });
                  }}
                  id="phoneNumber"
                  label="Patient's Phone Number"
                  name="phoneNumber"
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
                  label="Visa Issue Date"
                  value={visaIssueDate}
                  onChange={(newValue) => setVisaIssueDate(newValue)}
                />
                <DatePicker
                  sx={{ margin: "16px 0 8px 0" }}
                  margin="normal"
                  label="Date of Arrival"
                  value={dateofArrival}
                  onChange={(newValue) => setDateofArrival(newValue)}
                />
                <p>Patient Image:</p>
                <UploadButtons
                  acceptFiles={"image/*"}
                  receivedImg={imageUrl}
                  setReceivedImg={setImageUrl}
                  customID={"patient-upload"}
                />
                <br />
                <p>Passport Image:</p>
                <UploadButtons
                  acceptFiles={".pdf"}
                  receivedImg={passportImg}
                  setReceivedImg={setPassportImg}
                  customID={"passport-upload"}
                />
              </section>
              <br />
              <br />
              {thisPTType !== "non-transplant" && (
                <div>
                  <SectionTitle value={"Donor"} />
                  <section>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => {
                        setPatientDetails((prev) => {
                          return { ...prev, nameOfDonor: e.target.value };
                        });
                      }}
                      value={patientDetails.nameOfDonor}
                      name="donor"
                      label="Donor's Name"
                      id="donor"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => {
                        setPatientDetails((prev) => {
                          return { ...prev, donorUHID: e.target.value };
                        });
                      }}
                      value={patientDetails.donorUHID}
                      name="donorUHID"
                      label="Donor's UHID"
                      id="donorUHID"
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      onChange={(e) => {
                        setPatientDetails((prev) => {
                          return {
                            ...prev,
                            donorPassportNumber: e.target.value,
                          };
                        });
                      }}
                      value={patientDetails.donorPassportNumber}
                      name="donorPassportNumber"
                      label="Donor's Passport Number"
                      id="donorPassportNumber"
                    />

                    <DatePicker
                      sx={{ margin: "16px 0 8px 0" }}
                      margin="normal"
                      label="Donor Visa Expire Date"
                      value={donorVisaExpireDate}
                      onChange={(newValue) =>
                        setDonorVisaExpireDateValue(newValue)
                      }
                    />
                    <DatePicker
                      sx={{ margin: "16px 0 8px 0" }}
                      margin="normal"
                      label="Donor Visa Issue Date"
                      value={donorVisaIssueDate}
                      onChange={(newValue) => setDonorVisaIssueDate(newValue)}
                    />
                  </section>
                </div>
              )}

              <SectionTitle value={"Attendant 1"} />
              <section>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, nameOfAttendant: e.target.value };
                    });
                  }}
                  value={patientDetails.nameOfAttendant}
                  name="nameOfAttendant"
                  label="Attendant's Name"
                  id="nameOfAttendant"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return {
                        ...prev,
                        attendantPassportNumber: e.target.value,
                      };
                    });
                  }}
                  value={patientDetails.attendantPassportNumber}
                  name="attendantPassportNumber"
                  label="Attendant's Passport Number"
                  id="attendantPassportNumber"
                />

                <DatePicker
                  sx={{ margin: "16px 0 8px 0" }}
                  margin="normal"
                  label="Attendant Visa Expire Date"
                  value={attendantVisaExpireDate}
                  onChange={(newValue) =>
                    setAttendantVisaExpireDateValue(newValue)
                  }
                />
                <DatePicker
                  sx={{ margin: "16px 0 8px 0" }}
                  margin="normal"
                  label="Attendant Visa Issue Date"
                  value={attendantVisaIssueDate}
                  onChange={(newValue) => setAttendantVisaIssueDate(newValue)}
                />
              </section>
              <SectionTitle value={"Attendant 2"} />
              <section>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return { ...prev, nameOfAttendant2: e.target.value };
                    });
                  }}
                  value={patientDetails.nameOfAttendant2}
                  name="nameOfAttendant2"
                  label="Second Attendant's Name"
                  id="nameOfAttendant2"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setPatientDetails((prev) => {
                      return {
                        ...prev,
                        attendant2PassportNumber: e.target.value,
                      };
                    });
                  }}
                  value={patientDetails.attendant2PassportNumber}
                  name="attendant2PassportNumber"
                  label="Second Attendant's Passport Number"
                  id="attendant2PassportNumber"
                />

                <DatePicker
                  sx={{ margin: "16px 0 8px 0" }}
                  margin="normal"
                  label="Second Attendant Visa Expire Date"
                  value={attendant2VisaExpireDate}
                  onChange={(newValue) =>
                    setAttendant2VisaExpireDateValue(newValue)
                  }
                />
                <DatePicker
                  sx={{ margin: "16px 0 8px 0" }}
                  margin="normal"
                  label="Second Attendant Visa Issue Date"
                  value={attendant2VisaIssueDate}
                  onChange={(newValue) => setAttendant2VisaIssueDate(newValue)}
                />
              </section>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={
                  buttonLabel === "saved!" || buttonLabel === "saving..."
                }
                color={buttonLabel === "saved!" ? "success" : "primary"}
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
