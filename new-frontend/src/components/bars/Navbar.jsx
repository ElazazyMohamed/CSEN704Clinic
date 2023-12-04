import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AdminNavbarItems } from "./consts/admin/AdminNavbarItems";
import { PatientNavbarItems } from "./consts/patient/PatientNavbarItems";
import { DoctorNavbarItems } from "./consts/doctor/DoctorNavbarItems";
import {} from "./consts/doctor/DoctorAppbarItems";
import { setOpenedNavbar, setOpenedAppbar } from "../../redux/userSlice";

const drawerWidth = 320;

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let NavbarItems = [];
  console.log(user);
  switch (user.role) {
    case "admin":
      NavbarItems = AdminNavbarItems;
      break;
    case "patient":
      NavbarItems = PatientNavbarItems;
      break;
    case "doctor":
      NavbarItems = DoctorNavbarItems;
      break;
    default:
      break;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {NavbarItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => {
                dispatch(setOpenedNavbar(item.label));
                dispatch(setOpenedAppbar(item.appbarLabel));
              }}
            >
              <ListItemIcon sx={NavbarItems.icons}>{item.icon}</ListItemIcon>
              <ListItemText sx={NavbarItems.text} primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
