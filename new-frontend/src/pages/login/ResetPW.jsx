import * as React from "react";
import { Container, CssBaseline, Box } from "@mui/material";
import ResetForm from "../../components/login/ResetForm";

export default function ResetPW() {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        display="flex"
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <ResetForm />
      </Box>
    </Container>
  );
}
