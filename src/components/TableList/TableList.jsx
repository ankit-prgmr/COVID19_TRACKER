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
import ArrowTicker from "../ArrowTicker/ArrowTicker";
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
          {data.map((item) => {
            const {
              confirmed,
              active,
              recovered,
              deaths,
              deltaconfirmed,
              deltarecovered,
              deltadeaths,
              stateName,
            } = item;
            return (
              <TableRow key={stateName}>
                <TableCell component="th" scope="row">
                  {stateName}
                </TableCell>
                <TableCell align="right">
                  <span className={styles.tableCell}>
                    <span>
                      {deltaconfirmed && deltaconfirmed > 0 ? (
                        <ArrowTicker
                          color="rgba(0,0,255,0.9)"
                          value={deltaconfirmed}
                        />
                      ) : null}
                    </span>
                    {confirmed}
                  </span>
                </TableCell>
                <TableCell align="right">{active}</TableCell>
                <TableCell align="right">
                  <span className={styles.tableCell}>
                    <span>
                      {deltarecovered && deltarecovered > 0 ? (
                        <ArrowTicker
                          color="rgba(0,255,0,0.9)"
                          value={deltarecovered}
                        />
                      ) : null}
                    </span>
                    {recovered}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className={styles.tableCell}>
                    <span>
                      {deltadeaths && deltadeaths > 0 ? (
                        <ArrowTicker
                          color="rgba(255,0,0,0.9)"
                          value={deltadeaths}
                        />
                      ) : null}
                    </span>
                    {deaths}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
