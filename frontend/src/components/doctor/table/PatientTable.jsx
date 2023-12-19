import React from "react";
import { Space, Table } from "antd";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setOpenedNavbar } from "../../../redux/userSlice";
import { NavbarLabel } from "../../bars/consts/enums";

const PatientTable = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Appointment Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(setOpenedNavbar(NavbarLabel.HealthRecords));
            }}
          >
            Health Records
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(setOpenedNavbar(NavbarLabel.Prescriptions));
            }}
          >
            Prescriptions
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => {
              snackbar();
              setMessage("Follow-Up scheduled Successfully");
            }}
          >
            Follow-Up
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#1677ff",
              cursor: "pointer",
            }}
            onClick={() => {
              snackbar();
              setMessage("Appointment rescheduled successfully!");
            }}
          >
            Reschedule
          </button>
        </Space>
      ),
    },
  ];

  function snackbar() {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default PatientTable;
