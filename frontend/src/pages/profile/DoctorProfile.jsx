import React from "react";
import DoctorProfileForm from "../../components/doctor/forms/DoctorProfileForm";
import { Box } from "@mui/material";

export default function DoctorProfile() {
  return (
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
      <DoctorProfileForm />
    </Box>
  );
}
