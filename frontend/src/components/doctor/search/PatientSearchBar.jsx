import { useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  Button,
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Popper,
} from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// third-party
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

// project imports
import Transitions from "./Transitions";

// assets
import { IconSearch } from "@tabler/icons";
import { shouldForwardProp } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: "99%",
  top: "-55px !important",
  padding: "0 12px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px",
  },
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    "& input": {
      background: "transparent !important",
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 4,
      background: "#fff",
    },
  })
);

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(
  ({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: "white",
    color: theme.palette.secondary.dark,
    "&:hover": {
      background: "lightblue",
      color: theme.palette.secondary.light,
    },
  })
);

// ==============================|| SEARCH INPUT ||============================== //

const PatientSearchBar = ({ search }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState("");

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: "12px" }}>
                  <HeaderAvatarStyle
                    variant="rounded"
                    {...bindToggle(popupState)}
                  >
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions
                      type="zoom"
                      {...TransitionProps}
                      sx={{ transformOrigin: "center left" }}
                    >
                      <Card
                        sx={{
                          background: "#fff",
                          [theme.breakpoints.down("sm")]: {
                            border: 0,
                            boxShadow: "none",
                          },
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          ></Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch
                stroke={1.5}
                size="1rem"
                color={theme.palette.grey[500]}
              />
            </InputAdornment>
          }
          endAdornment={
            <>
              <InputAdornment position="end">
                <ButtonBase sx={{ borderRadius: "10px" }}>
                  <HeaderAvatarStyle onClick={() => search(value)}>
                    <IconSearch size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </InputAdornment>
              <InputAdornment>
                <ButtonBase sx={{ borderRadius: "10px" }}>
                  <HeaderAvatarStyle onClick={handleClick}>
                    <TuneIcon />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </InputAdornment>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  Status
                  <Button>1</Button>
                  <Button>2</Button>
                </MenuItem>
                <MenuItem>
                  Date{" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      closeOnSelect
                      label=""
                      //value={date}
                      // onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </MenuItem>
                <MenuItem>Reset</MenuItem>
              </Menu>
            </>
          }
          aria-describedby="search-helper-text"
          inputProps={{ "aria-label": "weight" }}
        />
      </Box>
    </>
  );
};
export default PatientSearchBar;
