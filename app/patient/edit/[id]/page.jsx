"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/app/axiosInstance";
import { API_URL } from "@/app/apiConfig";
import { CheckUserRole } from "@/app/routerGuard";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";
import LabTabs from "@/app/components/patient-edit-tabs";
import Stack from "@mui/material/Stack";
import PreviewIcon from "@mui/icons-material/Preview";
import ImgButton from "@/app/components/imgButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import SectionTitle from "@/app/components/section-title";

const defaultTheme = createTheme();

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
              ? receivedImg?.name || "upload pdf file"
              : "select image",
          }}
        />
        <p style={{ width: "150px" }}>
          {receivedImg ? "uploading..." : "chosen file: none"}
        </p>

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

const BasicInputs = ({
  currentPatientDetails,
  setCurrentPatientDetails,
  setButtonLabel,
}) => {
  const [hospitalsList, setHospitalsList] = React.useState([]); // patient

  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${API_URL}/api/hospitals`);
      setHospitalsList(data);
    })();
  }, []);
  return (
    <section>
      <SectionTitle value={"Patient"} />
      <TextField
        margin="normal"
        required
        fullWidth
        value={currentPatientDetails.fullName}
        onChange={(e) => {
          setCurrentPatientDetails((prev) => {
            return { ...prev, fullName: e.target.value };
          });
          setButtonLabel("Confirm");
        }}
        id="fullName"
        label="Patient's Full Name"
        name="fullName"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        value={currentPatientDetails.patientUHID}
        onChange={(e) => {
          setCurrentPatientDetails((prev) => {
            return { ...prev, patientUHID: e.target.value };
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
            return { ...prev, passportNumber: e.target.value };
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
            return { ...prev, doctorDetails: e.target.value };
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
            return { ...prev, country: e.target.value };
          });
          setButtonLabel("Confirm");
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
          value={currentPatientDetails.hospital}
          fullWidth
          required
          label="Patient's Hospital"
          onChange={(e) => {
            setCurrentPatientDetails((prev) => {
              return { ...prev, hospital: e.target.value };
            });
            setButtonLabel("Confirm");
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
        value={currentPatientDetails.speciality}
        onChange={(e) => {
          setCurrentPatientDetails((prev) => {
            return { ...prev, speciality: e.target.value };
          });
          setButtonLabel("Confirm");
        }}
        id="speciality"
        label="Patient's Speciality"
        name="speciality"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        value={currentPatientDetails.visaType}
        onChange={(e) => {
          setCurrentPatientDetails((prev) => {
            return { ...prev, visaType: e.target.value };
          });
          setButtonLabel("Confirm");
        }}
        id="visaType"
        label="Patient's visaType"
        name="visaType"
      />
      <TextField
        margin="normal"
        fullWidth
        value={currentPatientDetails.phoneNumber}
        onChange={(e) => {
          setCurrentPatientDetails((prev) => {
            return { ...prev, phoneNumber: e.target.value };
          });
          setButtonLabel("Confirm");
        }}
        id="phoneNumber"
        label="Patient's Phone Number"
        name="phoneNumber"
      />
      {currentPatientDetails.typeOfPatient !== "non-transplant" && (
        <div>
          <SectionTitle value={"Donor"} />
          <TextField
            margin="normal"
            fullWidth
            required
            onChange={(e) => {
              setCurrentPatientDetails((prev) => {
                return { ...prev, nameOfDonor: e.target.value };
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
                return { ...prev, donorUHID: e.target.value };
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
                return { ...prev, donorPassportNumber: e.target.value };
              });
              setButtonLabel("Confirm");
            }}
            value={currentPatientDetails.donorPassportNumber}
            name="donorPassportNumber"
            label="Donor's Passport Number"
            id="donorPassportNumber"
          />
        </div>
      )}
      <SectionTitle value={"Attendant 1"} />
      <div>
        <TextField
          margin="normal"
          fullWidth
          onChange={(e) => {
            setCurrentPatientDetails((prev) => {
              return { ...prev, nameOfAttendant: e.target.value };
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
              return { ...prev, attendantPassportNumber: e.target.value };
            });
            setButtonLabel("Confirm");
          }}
          value={currentPatientDetails.attendantPassportNumber}
          name="attendantPassportNumber"
          label="Attendant's Passport Number"
          id="attendantPassportNumber"
        />
      </div>
      <SectionTitle value={"Attendant 2"} />
      <div>
        <TextField
          margin="normal"
          fullWidth
          onChange={(e) => {
            setCurrentPatientDetails((prev) => {
              return { ...prev, nameOfAttendant2: e.target.value };
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
              return { ...prev, attendant2PassportNumber: e.target.value };
            });
            setButtonLabel("Confirm");
          }}
          value={currentPatientDetails.attendantPassportNumber}
          name="attendant2PassportNumber"
          label="Second Attendant's Passport Number"
          id="attendant2PassportNumber"
        />
      </div>
    </section>
  );
};

const DateInputs = ({
  currentPatientDetails,
  setButtonLabel,
  visaDateVals,
}) => {
  return (
    <section>
      <SectionTitle value={"Patient"} />
      <DatePicker
        sx={{ margin: "16px 0 8px 0" }}
        margin="normal"
        label="Visa Expiration Date"
        value={visaDateVals.visaExpireDate}
        onChange={(newValue) => {
          visaDateVals.setVisaExpireDateValue(newValue);
          setButtonLabel("Confirm");
        }}
      />
      <DatePicker
        sx={{ margin: "16px 0 8px 0" }}
        margin="normal"
        label="Visa Issue Date"
        value={visaDateVals.visaIssueDate}
        onChange={(newValue) => {
          visaDateVals.setVisaIssueDate(newValue);
          setButtonLabel("Confirm");
        }}
      />
      <DatePicker
        sx={{ margin: "16px 0 8px 0" }}
        margin="normal"
        label="Date of Arrival"
        value={visaDateVals.dateofArrival}
        onChange={(newValue) => {
          visaDateVals.setDateofArrival(newValue);
          setButtonLabel("Confirm");
        }}
      />
      {currentPatientDetails.typeOfPatient !== "non-transplant" && (
        <div>
          <SectionTitle value={"Donor"} />
          <section>
            <DatePicker
              sx={{ margin: "16px 0 8px 0" }}
              margin="normal"
              label="Donor Visa Expire Date"
              value={visaDateVals.donorVisaExpireDate}
              onChange={(newValue) => {
                visaDateVals.setDonorVisaExpireDateValue(newValue);
                setButtonLabel("Confirm");
              }}
            />
            <DatePicker
              sx={{ margin: "16px 0 8px 0" }}
              margin="normal"
              label="Donor Visa Issue Date"
              value={visaDateVals.donorVisaIssueDate}
              onChange={(newValue) => {
                visaDateVals.setDonorVisaIssueDate(newValue);
                setButtonLabel("Confirm");
              }}
            />
          </section>
        </div>
      )}
      <SectionTitle value={"Attendant 1"} />
      <section>
        <DatePicker
          sx={{ margin: "16px 0 8px 0" }}
          margin="normal"
          label="Attendant Visa Expire Date"
          value={visaDateVals.attendantVisaExpireDate}
          onChange={(newValue) => {
            visaDateVals.setAttendantVisaExpireDateValue(newValue);
            setButtonLabel("Confirm");
          }}
        />
        <DatePicker
          sx={{ margin: "16px 0 8px 0" }}
          margin="normal"
          label="Attendant Visa Issue Date"
          value={visaDateVals.attendantVisaIssueDate}
          onChange={(newValue) => {
            visaDateVals.setAttendantVisaIssueDate(newValue);
            setButtonLabel("Confirm");
          }}
        />
      </section>
      <SectionTitle value={"Attendant 2"} />
      <section>
        <DatePicker
          sx={{ margin: "16px 0 8px 0" }}
          margin="normal"
          label="Second Attendant Visa Expire Date"
          value={visaDateVals.attendant2VisaExpireDate}
          onChange={(newValue) => {
            visaDateVals.setAttendant2VisaExpireDateValue(newValue);
            setButtonLabel("Confirm");
          }}
        />
        <DatePicker
          sx={{ margin: "16px 0 8px 0" }}
          margin="normal"
          label="Second Attendant Visa Issue Date"
          value={visaDateVals.attendant2VisaIssueDate}
          onChange={(newValue) => {
            visaDateVals.setAttendant2VisaIssueDate(newValue);
            setButtonLabel("Confirm");
          }}
        />
      </section>
      <SectionTitle value={"Progress Based Dates"} />
      {currentPatientDetails.typeOfPatient !== "non-transplant" && (
        <section>
          <DatePicker
            sx={{ margin: "16px 0 8px 0" }}
            margin="normal"
            label="Committee Date"
            value={visaDateVals.committeeDate}
            onChange={(newValue) => {
              visaDateVals.setCommitteeDate(newValue);
              setButtonLabel("Confirm");
            }}
          />
          <DatePicker
            sx={{ margin: "16px 0 8px 0" }}
            margin="normal"
            label="Admission Date"
            value={visaDateVals.admissionDate}
            onChange={(newValue) => {
              visaDateVals.setAdmissionDate(newValue);
              setButtonLabel("Confirm");
            }}
          />
          <DatePicker
            sx={{ margin: "16px 0 8px 0" }}
            margin="normal"
            label="surgery Date"
            value={visaDateVals.surgeryDate}
            onChange={(newValue) => {
              visaDateVals.setSurgeryDate(newValue);
              setButtonLabel("Confirm");
            }}
          />
          <DatePicker
            sx={{ margin: "16px 0 8px 0" }}
            margin="normal"
            label="Discharge Date"
            value={visaDateVals.dischargeDate}
            onChange={(newValue) => {
              visaDateVals.setDischargeDate(newValue);
              setButtonLabel("Confirm");
            }}
          />
        </section>
      )}
      <DatePicker
        sx={{ margin: "16px 0 8px 0" }}
        margin="normal"
        label="Departure Date"
        value={visaDateVals.returnTicket}
        onChange={(newValue) => {
          visaDateVals.setReturnTicket(newValue);
          setButtonLabel("Confirm");
        }}
      />
    </section>
  );
};

const FileUploads = ({
  currentPatientDetails,
  patientID,
  setCurrentPatientDetails,
}) => {
  const [dischargeSummary, setDischargeSummary] = React.useState(null);
  const [patientPassport, setPatientPassport] = React.useState(null);
  const downloadPatientPassport = async () => {
    // const pictureUrl = `${API_URL}${currentPatientDetails.patientPassport}`;
    const { data: passportUrl } = await axios.get(
      `${API_URL}/api/patients/passport/${patientID}`
    );
    // const modifiedString = currentPatientDetails.patientPassport.replace("passports/", "");
    window.open(passportUrl.url, "_blank");
  };
  const downloadPatientSummary = async () => {
    // const pictureUrl = `${API_URL}${currentPatientDetails.patientPassport}`;
    const { data: passportUrl } = await axios.get(
      `${API_URL}/api/patients/summary/${patientID}`
    );
    // const modifiedString = currentPatientDetails.patientPassport.replace("passports/", "");
    window.open(passportUrl.url, "_blank");
  };

  const uploadFile = async (fileName, uPfile, setSt) => {
    const uploadUrl = fileName === "patientPassport" ? "passport" : "summary";
    const formData = new FormData();
    formData.append(fileName, uPfile);
    const saveResponse = await axios.post(
      `${API_URL}/api/patients/${uploadUrl}/${patientID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (saveResponse.status === 200) {
      setSt(null);
      setCurrentPatientDetails((prev) => {
        return { ...prev, [fileName]: saveResponse.data.uploadedFileName };
      });
    }
  };

  React.useEffect(() => {
    if (patientPassport) {
      uploadFile("patientPassport", patientPassport, setPatientPassport);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientPassport]);

  React.useEffect(() => {
    if (dischargeSummary) {
      uploadFile("dischargeSummary", dischargeSummary, setDischargeSummary);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dischargeSummary]);

  return (
    <section>
      <div style={{ width: "100%" }}>
        <SectionTitle value={"Patient Files"} />
        {currentPatientDetails.patientPassport !== "none" && (
          <div>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              onClick={downloadPatientPassport}
            >
              <PreviewIcon fontSize="small" style={{ marginRight: "10px" }} />{" "}
              passport
            </Button>
          </div>
        )}
        {currentPatientDetails?.dischargeSummary && (
          <div>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              onClick={downloadPatientSummary}
            >
              <PreviewIcon fontSize="small" style={{ marginRight: "10px" }} />{" "}
              Discharge Summary
            </Button>
          </div>
        )}
        <br />
        <br />
        <p>Passport: </p>
        <UploadButtons
          acceptFiles={".pdf"}
          receivedImg={patientPassport}
          setReceivedImg={setPatientPassport}
          customID={"passport-upload"}
        />
        <br />
        <p>Discharge Summary</p>
        <UploadButtons
          acceptFiles={".pdf"}
          receivedImg={dischargeSummary}
          setReceivedImg={setDischargeSummary}
          customID={"dischargeSummary-upload"}
        />
      </div>
    </section>
  );
};

export default function EditPatient({ params }) {
    const currentUser = useSelector((state) => state.userAuth);
  const router = useRouter();
  const patientID = params.id;
  const [currentPatientDetails, setCurrentPatientDetails] =
    React.useState(undefined);
  const [buttonLabel, setButtonLabel] = React.useState("edit patient");
  const [deleteLabel, setDeleteLabel] = React.useState("Delete Patient");

  // Visa States

  const [visaIssueDate, setVisaIssueDate] = React.useState("");
  const [dateofArrival, setDateofArrival] = React.useState("");
  const [visaExpireDate, setVisaExpireDateValue] = React.useState(
    dayjs("2022-04-17")
  );

  const [donorVisaExpireDate, setDonorVisaExpireDateValue] = React.useState(""); // donor
  const [donorVisaIssueDate, setDonorVisaIssueDate] = React.useState("");
  const [attendantVisaExpireDate, setAttendantVisaExpireDateValue] =
    React.useState(""); // Attendant
  const [attendantVisaIssueDate, setAttendantVisaIssueDate] =
    React.useState("");
  const [attendant2VisaExpireDate, setAttendant2VisaExpireDateValue] =
    React.useState(""); // Attendant2
  const [attendant2VisaIssueDate, setAttendant2VisaIssueDate] =
    React.useState("");

  const [committeeDate, setCommitteeDate] = React.useState("");
  const [admissionDate, setAdmissionDate] = React.useState("");
  const [surgeryDate, setSurgeryDate] = React.useState("");
  const [dischargeDate, setDischargeDate] = React.useState("");
  const [returnTicket, setReturnTicket] = React.useState(null);

  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${API_URL}/api/patients/one/${patientID}`);
      console.log(data);
      setCurrentPatientDetails(data);

      const date = new Date(data.dateOfVisaExpiry);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

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
      return `${dateObj.$y}-${("" + (dateObj.$M + 1)).padStart(2, "0")}-${(
        "" + dateObj.$D
      ).padStart(2, "0")}`;
    };

    const formatVisaExpireDate = (date) => {
      const chosenDate = new Date(reformatDate(date));
      chosenDate.setHours(23, 59, 59, 999);
      return chosenDate.toISOString();
    };

    event.preventDefault();
    const edittingObj = {
      ...currentPatientDetails,
      // dates
      dateOfVisaExpiry: formatVisaExpireDate(visaExpireDate),
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
      const editResponse = await axios.put(
        `${API_URL}/api/patients/${patientID}`,
        edittingObj
      );
      if (editResponse.status === 200) {
        setButtonLabel("updated!");
        setTimeout(() => {
          setButtonLabel("edit patient");
        }, 2000);
      }
    })();
  };

  const deletePatient = async () => {
    setDeleteLabel("deleting...");
    const deleteResponse = await axios.delete(
      `${API_URL}/api/patients/${patientID}`
    );
    if (deleteResponse.status === 200) {
      setDeleteLabel("Delete Patient");
      router.push("/patients");
    } else {
      setDeleteLabel("Delete Patient");
    }
  };

  return (
    <CheckUserRole allowedRoles={["admin", "developer"]}>
      <ThemeProvider theme={defaultTheme}>
        {currentPatientDetails && (
          <div>
            <IconButton
              onClick={() => router.back()}
              aria-label="delete"
              size="large"
            >
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
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
                  <EditIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Patient Details
                </Typography>
                <br />
                <br />
                {currentPatientDetails.patientPicture !== "none" && (
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt={currentPatientDetails.fullName}
                    src={`${API_URL}${currentPatientDetails.patientPicture}`}
                  />
                )}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate={false}
                  sx={{ mt: 1, width: "100%" }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentPatientDetails.extendingVisa}
                        onChange={(ev) => {
                          setCurrentPatientDetails((prev) => {
                            return {
                              ...prev,
                              extendingVisa: ev.target.checked,
                            };
                          });
                          setButtonLabel("Confirm");
                        }}
                        name="gilad"
                      />
                    }
                    label="Visa Extension in proccess"
                  />
                  <LabTabs
                    tab1={{
                      content: (
                        <BasicInputs
                          setButtonLabel={setButtonLabel}
                          currentPatientDetails={currentPatientDetails}
                          setCurrentPatientDetails={setCurrentPatientDetails}
                        />
                      ),
                      label: "Basics",
                    }}
                    tab2={{
                      content: (
                        <DateInputs
                          setButtonLabel={setButtonLabel}
                          currentPatientDetails={currentPatientDetails}
                          visaDateVals={{
                            visaIssueDate,
                            setVisaIssueDate,
                            dateofArrival,
                            setDateofArrival,
                            visaExpireDate,
                            setVisaExpireDateValue,
                            donorVisaExpireDate,
                            donorVisaIssueDate,
                            attendantVisaExpireDate,
                            attendantVisaIssueDate,
                            attendant2VisaExpireDate,
                            attendant2VisaIssueDate,
                            setDonorVisaExpireDateValue,
                            setDonorVisaIssueDate,
                            setAttendantVisaExpireDateValue,
                            setAttendantVisaIssueDate,
                            setAttendant2VisaExpireDateValue,
                            setAttendant2VisaIssueDate,
                            committeeDate,
                            admissionDate,
                            surgeryDate,
                            dischargeDate,
                            returnTicket,
                            setCommitteeDate,
                            setAdmissionDate,
                            setSurgeryDate,
                            setDischargeDate,
                            setReturnTicket,
                          }}
                        />
                      ),
                      label: "Dates",
                    }}
                    tab3={{
                      content: (
                        <FileUploads
                          patientID={patientID}
                          setCurrentPatientDetails={setCurrentPatientDetails}
                          currentPatientDetails={currentPatientDetails}
                        />
                      ),
                      label: "Files",
                    }}
                  />
                  {currentUser.value.hospital ===
                    currentPatientDetails.hospital && (
                    <div>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={
                          buttonLabel === "edit patient" ||
                          buttonLabel === "updated!" ||
                          buttonLabel === "saving"
                        }
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
                            !confirm(
                              `Are you sure you want to delete ${currentPatientDetails.fullName}`
                            )
                          ) {
                            return;
                          }
                          deletePatient();
                        }}
                      >
                        {deleteLabel}
                      </Button>
                    </div>
                  )}
                </Box>
              </Box>
            </Container>
          </div>
        )}
      </ThemeProvider>
    </CheckUserRole>
  );
}
