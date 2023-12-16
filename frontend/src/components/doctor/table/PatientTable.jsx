import React from "react";
import { Space, Table, message } from "antd";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';


const PatientTable = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
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
            onClick={()=>{setOpen(true); setMessage("This appointment has been confirmed.")}}
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
            onClick={handleReject}
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
            onClick={handleReject}
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
            onClick={handleReject}
          >
            Reschedule
          </button>
        </Space>
      ),
    },
  ];
  
  const handleReject = () => {
    console.log("Rejected");
    ``;
  };
  
  
function snackbar() {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )

}
export default PatientTable;
