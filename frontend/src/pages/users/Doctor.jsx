import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";
import Appbar from "../../components/bars/Appbar";
import { useSelector } from "react-redux";
import { AppbarLabel, NavbarLabel } from "../../components/bars/consts/enums";
import Typography from "@mui/material/Typography";
import PatientSearchBar from "../../components/doctor/search/PatientSearchBar";
import PatientTable from "../../components/doctor/table/PatientTable";
import HealthRecordsTable from "../../components/doctor/table/HealthRecordsTable";
import PrescriptionsTable from "../../components/doctor/table/Prescriptions";
import MedicinesTable from "../../components/doctor/table/Medicines";
import { Button } from "antd";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { setOpenedNavbar } from "../../redux/userSlice";
import AddMedicineForm from "../../components/patient/forms/AddMedicineForm";


export default function Doctor() {
  const data = [
    {
      key: "1",
      name: "Joe Black",
      date: "2021-10-10",
    },
    {
      key: "2",
      name: "Joe Black",
      date: "2021-10-10",
    },
    {
      key: "3",
      name: "Joe Black",
      date: "2021-10-10",
    },
    {
      key: "4",
      name: "Joe Black",
      date: "2021-10-10",
    },
    {
      key: "5",
      name: "Joe Black",
      date: "2021-10-10",
    },
  ];
  const [data2, setData2] = useState(data);

  const healthRecordData = [
    {
      'key': "1",
      'date': "2021-10-10",
      'uploaded by': "Doctor",
      'description': "Appointment",
      'file': "https://filePDF.com",
      'doctor notes': 'he is very sick'
    },
    {
      'key': "2",
      'date': "2021-11-10",
      'uploaded by': "Doctor",
      'description': "Follow Up",
      'file': "https://anotherFilePDF.com",
      'doctor notes': 'becomes well'
    },
    {
      'key': "3",
      'date': "2021-12-10",
      'uploaded by': "Doctor",
      'description': "Follow Up 2",
      'file': "https://otherFilePDF.com",
      'doctor notes': 'Recoverd'
    }
  ];
  const [healthRecordData2, sethealthRecordData] = useState(healthRecordData);

  const prescriptionsData = [
    {
      'key': "1",
      'date': "2023-09-03",
      'doctor': "Doctor 1",
      'medicine': "[{'medicine': 'Panadol', 'dosage': '1 ml', 'duration': '1 week'}]"
    },
    {
      'key': "2",
      'date': "2021-10-11",
      'doctor': "Doctor 2",
      'medicine': "[{'medicine': 'Panadol', 'dosage': '1 ml', 'duration': '1 week'}]"
    },
    {
      'key': "3",
      'date': "2024-01-12",
      'doctor': "Doctor 3",
      'medicine': "[{'medicine': 'Panadol', 'dosage': '1 ml', 'duration': '1 week'}]"
    }
  ];
  const [prescriptionsData2, setPrescriptionsData] = useState(prescriptionsData);


  const medicinesData = [
    {
      'key': '0', 'medicine': 'Panadol', 'dosage': '1 ml', 'duration': '1 week', 'action': '0'
    },
    {
      'key': '1', 'medicine': 'Panadol', 'dosage': '2 ml', 'duration': '2 weeks', 'action': '1'
    },
    {
      'key': '2', 'medicine': 'Panadol', 'dosage': '3 ml', 'duration': '3 weeks', 'action': '2'
    }
  ];
  const [medicinesData2, setMedicinesData] = useState(medicinesData);


  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  function search(inputs) {
    setData2(
      data.filter((item) =>
        item.name.toLowerCase().includes(inputs.toLowerCase())
      )
    );
  }

  const HandleAppbar = () => {
    switch (user.openedAppbar) {
      case AppbarLabel.ViewPatients:
        <Box sx={{ width: "50%" }}>
          <Typography variant="h4" align="center" marginBottom={5}>
            Patients
          </Typography>
        </Box>;
        break;
      case AppbarLabel.ViewAppointments:
        <Box sx={{ width: "75%" }}>
          <Typography variant="h4" align="center" margin={10}>
            Appointments
          </Typography>
        </Box>;
        break;
      default:
        return null;
    }
  };
  const HandleNavbar = () => {
    switch (user.openedNavbar) {
      case NavbarLabel.Patients:
        return (
          <Box sx={{ width: "50%" }}>
            <Typography variant="h4" align="center" marginBottom={5}>
              Patients
            </Typography>
            <Box
              display={"flex"}
              width={"100%"}
              justifyContent={"center"}
              mb={2}
            >
              <PatientSearchBar search={search} />
            </Box>
            <PatientTable data={data2} />
          </Box>
        );
      // case AppbarLabel.ViewAppointments:
      //   <Box sx={{ width: "75%" }}>
      //     <Typography variant="h4" align="center" margin={10}>
      //       Appointments
      //     </Typography>
      //   </Box>;
      //   break;
      case NavbarLabel.HealthRecords:
        return (
          <Box sx={{ width: "100%" }}>
            <Button
              onClick={
                () => {
                  dispatch(setOpenedNavbar(NavbarLabel.Patients))
                }}>

              <ArrowBackIcon />
            </Button>
            <Box display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}>
              <Typography variant="h4" align="center" marginBottom={5}>
                Patient's Health Records
              </Typography>
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                mb={2}
              >
              </Box>
              <HealthRecordsTable data={healthRecordData2} />
            </Box>
          </Box>
        );

      case NavbarLabel.Prescriptions:
        return (
          <Box sx={{ width: "100%" }}>
            <Button
              onClick={
                () => {
                  dispatch(setOpenedNavbar(NavbarLabel.Patients))
                }}>

              <ArrowBackIcon />
            </Button>
            <Box display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}>
              <Typography variant="h4" align="center" marginBottom={5}>
                Patient's Prescriptions
              </Typography>
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"center"}
                mb={2}
              >
              </Box>
              <PrescriptionsTable data={prescriptionsData} />
            </Box>
          </Box>
        );

      case NavbarLabel.Medicines:
        return (
          <Box sx={{ width: "100%" }}>
            <Button marginLeft={5}
              onClick={
                () => {
                  dispatch(setOpenedNavbar(NavbarLabel.Prescriptions))
                }}>

              <ArrowBackIcon />
            </Button>
            <Box display={"flex"} justifyContent={"center"} gap={20}>
              <Box display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Typography variant="h4" align="center" marginBottom={5}>
                  Prescription's Medicines
                </Typography>
                <Box
                  display={"flex"}
                  width={"100%"}
                  justifyContent={"center"}
                  mb={2}
                >
                </Box>
                <MedicinesTable data={medicinesData2} setMedicinesData={setMedicinesData} />
              </Box>

              <Box display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Typography variant="h4" align="center" marginBottom={5}>
                  Add Medicine
                </Typography>
                <Box
                  display={"flex"}
                  width={"100%"}
                  justifyContent={"center"}
                  mb={2}
                >
                </Box>
                <AddMedicineForm setMedicinesData={setMedicinesData} medicinesData2={medicinesData2} />
              </Box>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ width: "75%" }}>
            <Typography variant="h4" align="center" margin={10}>
              Welcome to Bond Clinic
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box display={"flex"}>
      <CssBaseline />
      <Appbar />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        <HandleAppbar />
        <HandleNavbar />
      </Box>
    </Box>
  );
}
