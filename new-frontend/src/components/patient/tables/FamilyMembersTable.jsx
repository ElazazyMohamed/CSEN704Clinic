import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  const rows = Object.values(props.tableData);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableCell>Name</TableCell>
          <TableCell>National ID</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Relation to Patient</TableCell>
          <TableCell>Package Subscribed</TableCell>
          <TableCell>Action</TableCell>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nationalID}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.age}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.gender}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.relationToPatient}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.packageType}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
