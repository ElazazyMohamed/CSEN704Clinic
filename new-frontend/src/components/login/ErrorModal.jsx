import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
export default function ErrorModal({ errorMsg, open, close }) {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          align="center"
        >
          Sorry, please try again.
        </Typography>
        <Typography
          sx={{ color: "error.main", my: "12px" }}
          align="center"
          id="modal-modal-description"
        >
          Error Message:
          <br />
          {errorMsg}
        </Typography>
        <Button
          sx={{
            width: "50%",
            alignSelf: "center",
            backgroundColor: "white",
            color: "black",
          }}
          onClick={close}
        >
          Retry
        </Button>
      </Box>
    </Modal>
  );
}
