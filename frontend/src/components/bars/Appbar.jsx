import React from "react";

import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  UserManagementList,
  PackageManagementList,
} from "./consts/admin/AdminAppbarItems";
import {
  FamilyMembersList,
  AppointmentsList,
} from "./consts/patient/PatientAppbarItems";
import {} from "./consts/doctor/DoctorAppbarItems";
import Button from "@mui/material/Button";
import { setOpenedAppbar } from "../../redux/userSlice";
import { NavbarLabel } from "./consts/enums";
import ProfileMenu from "./ProfileMenu";
export default function Appbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let AppbarItems = [];
  switch (user.openedNavbar) {
    //admin
    case NavbarLabel.UserManagement:
      AppbarItems = UserManagementList;
      break;
    case NavbarLabel.HealthPackages:
      AppbarItems = PackageManagementList;
      break;
    //patient
    case NavbarLabel.FamilyMembers:
      AppbarItems = FamilyMembersList;
      break;
    case NavbarLabel.Appointments:
      AppbarItems = AppointmentsList;
      break;
    default:
      break;
  }
  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        flexShrink: { sm: 0 },
      }}
    >
      <Toolbar>
        <a href={"/" + user.role + "/home"}>
          <img
            src="../../images/logo.png"
            alt="logo"
            style={{ width: "50px", height: "auto", marginRight: "10px" }}
          />
        </a>
        <Typography
          component="a"
          href={"/" + user.role + "/home"}
          variant="h6"
          noWrap
          sx={{
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "black",
            textDecoration: "none",
          }}
        >
          Bond Clinic
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            marginLeft: 10,
          }}
        >
          {AppbarItems.map((item) => (
            <Button
              key={item.id}
              sx={{
                color: "black",
                display: "block",
                marginLeft: 10,
              }}
              onClick={() => dispatch(setOpenedAppbar(item.label))}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
