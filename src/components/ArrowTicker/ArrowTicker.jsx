import React from "react";
import { ArrowUpward } from "@material-ui/icons";
import styles from "./ArrowTicker.module.css";

const ArrowTicker = (props) => {
  return (
    <>
      <span className={styles.container}>
        <ArrowUpward style={{ color: props.color }} />
        {props.value}
      </span>
    </>
  );
};

export default ArrowTicker;
