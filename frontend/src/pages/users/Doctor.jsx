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
