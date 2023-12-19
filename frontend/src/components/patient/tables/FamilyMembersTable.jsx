import * as React from "react";
import { Space, Table } from "antd";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { setOpenedNavbar } from "../../../redux/userSlice";
import { NavbarLabel } from "../../bars/consts/enums";

const FamilyMembersTable = ({ tableData1, tableData2 }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [data1, setData1] = React.useState(tableData1);
  const [data2, setData2] = React.useState(tableData2);

  let nextid1 = data1.length;
  let nextid2 = data2.length;

  const dispatch = useDispatch();

  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "National ID",
      dataIndex: "nationalID",
      key: "nationalID",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Relation to Patient",
      dataIndex: "relationToPatient",
      key: "relationToPatient",
    },
    {
      title: "Pacakge Subscribed",
      dataIndex: "packageType",
      key: "packageType",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (key) => (
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
              snackbar();
              setMessage("Unsubscribed Successfully!");
              // let array = [];
              // let array2 = data2;
              // for (let item of data1) {
              //   console.log(item);
              //   console.log(key);
              //   console.log(item.key);
              //   if (item.key != key) {
              //     array.push(item);
              //   } else {
              //     item.key = data2[data2.length - 1].key + 1;
              //     item.action = data2[data2.length - 1].action + 1;
              //     array2.push(item);
              //   }
              // }
              // setData1(array);
              // setData2(array2);
              // console.log(data1);
              // console.log(array);
              // console.log(data2);
              setData1(data1.filter((a) => a.action !== key));
              data1[key].key = nextid2;
              data1[key].action = nextid2;
              const data = [...data2, data1[key]];
              setData2(data);
            }}
          >
            Unsubscribe
          </button>
        </Space>
      ),
    },
  ];
  const columns2 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "National ID",
      dataIndex: "nationalID",
      key: "nationalID",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Relation to Patient",
      dataIndex: "relationToPatient",
      key: "relationToPatient",
    },
    {
      title: "Pacakge Subscribed",
      dataIndex: "packageType",
      key: "packageType",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (key) => (
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
              snackbar();
              setMessage("Subscribed Successfully!");
              setData2(data2.filter((a) => a.action !== key));
              data2[key].key = nextid1;
              data2[key].action = nextid1;
              const data = [...data1, data2[key]];
              setData1(data);
            }}
          >
            Subscribe to Health Packages
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
      <Typography variant="h4" align="center" marginBottom={5}>
        Subscribed Family Members
      </Typography>
      <Table columns={columns1} dataSource={data1} />
      <Typography variant="h4" align="center" marginBottom={5}>
        Non-Subscribed Family Members
      </Typography>
      <Table columns={columns2} dataSource={data2} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default FamilyMembersTable;
