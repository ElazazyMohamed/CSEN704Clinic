import React from "react";
import { Space, Table } from "antd";
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
          onClick={handleAccept}
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

const handleAccept = () => {
  console.log("Accepted");
};
const handleReject = () => {
  console.log("Rejected");
  ``;
};

const PatientTable = ({ data }) => (
  <Table columns={columns} dataSource={data} />
);
export default PatientTable;
