import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ChangeForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography
        align="center"
        sx={{ marginBottom: 3 }}
        component="h1"
        variant="h3"
      >
        Change Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Old Password"
        type="password"
        autoComplete="current-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="New Password"
        type="password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Repeat Password"
        type="password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
