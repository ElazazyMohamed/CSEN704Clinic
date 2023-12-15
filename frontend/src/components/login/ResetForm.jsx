import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
//import logo from "../../images/logo.svg";
import Typography from "@mui/material/Typography";
import Progress from "../../components/Progress";
import { useRef } from "react";

export default function ResetForm() {
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const [value, setValue] = React.useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    setValue(value + 33);
    inputRef1.current.remove();
    inputRef2.current.remove();

    console.log(value);
  };
  const buttonLabel = () => {
    if (value == 33) return "Verify OTP";
    else if (value == 66) return "Reset Password";
    else return "Send OTP";
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography
        align="center"
        sx={{ marginBottom: 3 }}
        component="h1"
        variant="h3"
      >
        Reset Password
      </Typography>
      <TextField
        ref={inputRef1}
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
      />
      <TextField
        ref={inputRef2}
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        id="email"
        autoComplete="email"
      />
      {value == 33 ? (
        <TextField
          margin="normal"
          required
          fullWidth
          name="otp"
          label="OTP"
          type="otp"
          id="otp"
          autoComplete="otp"
        />
      ) : value == 66 ? (
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
      ) : null}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonLabel()}
      </Button>
      <Progress value={value} />
    </Box>
  );
}
