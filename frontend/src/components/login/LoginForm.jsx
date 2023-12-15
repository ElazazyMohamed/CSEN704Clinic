import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import logo from "../../images/logo.svg";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUsername,
  setOpenedNavbar,
  setOpenedAppbar,
  setRole,
  setInfo,
} from "../../redux/userSlice";
import { AppbarLabel, NavbarLabel } from "../bars/consts/enums";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorModal from "./ErrorModal";

import Loading from "../Loading";
import { forwardRef } from "react";

const LoginForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [username, setUsernameState] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      username: username,
      password: password,
    };
    console.log(formData);

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: `include`,
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setUsername(data.username));
        dispatch(setRole(data.role));
        switch (data.role) {
          case "patient":
            dispatch(setOpenedNavbar(NavbarLabel.FamilyMembers));
            dispatch(setOpenedAppbar(AppbarLabel.ViewFamilyMembers));
            dispatch(setInfo(data.patient));
            break;
          case "admin":
            dispatch(setOpenedNavbar(NavbarLabel.UserManagement));
            dispatch(setOpenedAppbar(AppbarLabel.AddUser));
            dispatch(setInfo(data.admin));
            break;
          case "doctor":
            dispatch(setOpenedNavbar(NavbarLabel.Patients));
            dispatch(setInfo(data.doctor));
            break;
          default:
            break;
        }
        navigate(data.role + "/home");
      }
      if (!response.ok) {
        setOpen(true);
        setLoading(false);
        setErrorMsg(data.error);
      }
    } catch (error) {
      setOpen(true);
      setLoading(false);
      setErrorMsg(error);
    }
  };
  return (
    <div {...props} ref={ref}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>

        <Loading open={loading} close={handleClose} />

        <ErrorModal errorMsg={errorMsg} open={open} close={handleClose} />

        <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsernameState(event.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
});
export default LoginForm;
LoginForm.displayName = "LoginForm";
