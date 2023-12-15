import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  Divider,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";

export default function DoctorProfileForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    navigate("/change-password");
  };
  const user = useSelector((state) => state.user);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "50%",
      }}
    >
      <Typography
        sx={{ marginBottom: 1 }}
        component="h1"
        variant="h3"
        align="center"
      >
        Update Profile
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        disabled
        defaultValue={user.username}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        autoComplete="name"
        disabled
        defaultValue={user.info.name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        defaultValue={user.info.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="number"
        label="Phone Number"
        id="number"
        autoComplete="current-number"
        disabled
        defaultValue={user.info.phoneNumber}
      />
      <Divider>Specialization Information</Divider>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        columnSpacing={2}
      >
        <Grid item sx={{ width: "50%" }}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="hourlyRate"
              label="Hourly Rate"
              defaultValue={user.info.hourlyRate}
            />
          </FormControl>
        </Grid>
        <Grid item sx={{ width: "50%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="affiliation"
            label="Affiliation (hospital, clinic, etc.)"
            defaultValue={user.info.affiliation}
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        id="speciality"
        label="Specialization"
        disabled
        defaultValue={user.info.speciality}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      <Button type="submit" onClick={handleClick} fullWidth variant="outlined">
        Change My Password
      </Button>
    </Box>
  );
}
