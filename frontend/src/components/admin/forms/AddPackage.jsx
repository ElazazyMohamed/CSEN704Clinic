import React from "react";
import FormControl from "@mui/material/FormControl";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function AddPackage() {
  return (
    <FormControl fullWidth component={Paper} sx={{ padding: 2 }}>
      <TextField
        id="outlined-basic"
        label="Package Type"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
      />
      <TextField
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Price"
      />
      <TextField
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Clinic Discount"
      />
      <TextField
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Pharmacy Discount"
      />
      <TextField
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        label="Family Discount"
      />

      <Button
        sx={{
          width: "15%",
          alignSelf: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Submit
      </Button>
    </FormControl>
  );
}
