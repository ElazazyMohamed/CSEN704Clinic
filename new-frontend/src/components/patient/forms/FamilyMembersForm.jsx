import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function FamilyMembersForm() {
  const [value, setValue] = React.useState("male");
  const [value2, setValue2] = React.useState("child");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };

  return (
    <FormControl fullWidth component={Paper} sx={{ padding: 2 }}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        name="name"
        autoComplete="name"
      />

      <TextField
        id="outlined-basic"
        label="National ID"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        name="nationalID"
        autoComplete="nationalID"
      />

      <TextField
        id="outlined-basic"
        label="Age"
        variant="outlined"
        margin="normal"
        sx={{ width: "50%", alignSelf: "center" }}
        name="age"
        autoComplete="age"
      />

      <FormLabel
        sx={{ width: "50%", alignSelf: "center" }}
        id="demo-controlled-radio-buttons-group2"
      >
        Relation to Patient
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value2}
        sx={{ width: "50%", alignSelf: "center" }}
        onChange={handleChange2}
      >
        <FormControlLabel value="child" control={<Radio />} label="Child" />
        <FormControlLabel value="husband" control={<Radio />} label="Husband" />
        <FormControlLabel value="wife" control={<Radio />} label="Wife" />
      </RadioGroup>

      <FormLabel
        sx={{ width: "50%", alignSelf: "center" }}
        id="demo-controlled-radio-buttons-group"
      >
        Gender
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        sx={{ width: "50%", alignSelf: "center" }}
        onChange={handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
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
