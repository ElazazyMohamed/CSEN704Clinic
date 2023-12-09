import { Container, CssBaseline, Button, Box, Stack } from "@mui/material";

import * as React from "react";
import PatientRegisterForm from "../../components/login/PatientRegisterForm";
import DoctorRegisterForm from "../../components/login/DoctorRegisterForm";

export default function Register() {
  const [doctorToggle, setDoctorToggle] = React.useState(false);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Stack
        direction="column"
        height={"100vh"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {doctorToggle ? (
          <DoctorRegisterForm />
        ) : (
          <PatientRegisterForm setDoctorToggle={setDoctorToggle} />
        )}
        <Box
          sx={{
            width: "50%",
          }}
        >
          {doctorToggle ? (
            <Button
              onClick={() => {
                setDoctorToggle(!doctorToggle);
              }}
              fullWidth
              variant="outlined"
            >
              Not a doctor? Register as a patient
            </Button>
          ) : (
            <Button
              onClick={() => {
                setDoctorToggle(!doctorToggle);
              }}
              fullWidth
              variant="outlined"
            >
              Want to join us? Register as a doctor
            </Button>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
