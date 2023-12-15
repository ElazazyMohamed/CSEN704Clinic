
import { Container, CssBaseline, Box } from "@mui/material";
import ChangeForm from "../../components/login/ChangeForm";

export default function ChangePW() {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        display="flex"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <ChangeForm />
      </Box>
    </Container>
  );
}
