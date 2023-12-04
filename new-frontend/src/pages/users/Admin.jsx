import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Navbar from "../../components/bars/Navbar";
import Appbar from "../../components/bars/Appbar";
import { useSelector } from "react-redux";
import { AppbarLabel } from "../../components/bars/consts/enums";
import Typography from "@mui/material/Typography";
import AddUser from "../../components/admin/forms/AddUser";
import RemoveUser from "../../components/admin/forms/RemoveUser";

export default function Admin() {
  const user = useSelector((state) => state.user);

  switch (user.openedAppbar) {
    case AppbarLabel.AddUser:
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
            <Box sx={{ width: "50%" }}>
              <Typography variant="h4" align="center" marginBottom={5}>
                Add Users
              </Typography>
              <AddUser />
            </Box>
          </Box>
        </Box>
      );
    case AppbarLabel.RemoveUser:
      return (
        <Box display={"flex"}>
          <CssBaseline />
          <Appbar />
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Box sx={{ width: "75%" }}>
              <Typography variant="h4" align="center" margin={10}>
                Remove Users
              </Typography>
              <RemoveUser />
            </Box>
          </Box>
        </Box>
      );

    default:
      return (
        <Box display={"flex"}>
          <CssBaseline />
          <Appbar />
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Box sx={{ width: "75%" }}>
              <Typography variant="h4" align="center" margin={10}>
                Welcome to Bond Clinic
              </Typography>
            </Box>
          </Box>
        </Box>
      );
  }
}
