import React from "react";
import { Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Hourly Rate",
    dataIndex: "hourlyRate",
    key: "hourlyRate",
  },
  {
    title: "Affiliation",
    dataIndex: "affiliation",
    key: "affiliation",
  },
  {
    title: "Eduacational Background",
    dataIndex: "eduacationalBackground",
    key: "eduacationalBackground",
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
          Accept
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
          Reject
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
};

const NewDoctorTable = ({ data }) => (
  <Table columns={columns} dataSource={data} />
);
export default NewDoctorTable;
