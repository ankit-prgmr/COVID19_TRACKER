import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import styles from "./TableList.module.css";

const TableList = ({ index, value, data }) => {
  if (value !== index) return null;
  if (!data) return "Loading";
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeader}>State/UT</TableCell>
            <TableCell className={styles.tableHeader} align="right">
              Confirmed
            </TableCell>
            <TableCell className={styles.tableHeader} align="right">
              Active
            </TableCell>
            <TableCell className={styles.tableHeader} align="right">
              Recovered
            </TableCell>
            <TableCell className={styles.tableHeader} align="right">
              Deaths
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.stateName}>
              <TableCell component="th" scope="row">
                {item.stateName}
              </TableCell>
              <TableCell align="right">{item.confirmed}</TableCell>
              <TableCell align="right">{item.active}</TableCell>
              <TableCell align="right">{item.recovered}</TableCell>
              <TableCell align="right">{item.deaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
