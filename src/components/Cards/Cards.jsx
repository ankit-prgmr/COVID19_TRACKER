import React from "react";
import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import totalCasesIcon from "../../images/totalCases.png";
import recoveredIcon from "../../images/recovered.png";
import deathsIcon from "../../images/deaths.png";

const Cards = ({ index, value, data }) => {
  if (value !== index) return null;
  const { confirmed, recovered, deaths, lastUpdate } = data;
  if (!confirmed) {
    return "Loading...";
  }
  const lastUpdatedTime =
    (index === 0 ? new Date(lastUpdate).toLocaleString() : lastUpdate) + " IST";
  return (
    <div className={styles.container}>
      <p className={styles.dateTime}>Last updated at {lastUpdatedTime}</p>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent className={styles.cardContent}>
            <span>
              <img src={totalCasesIcon} alt="total cases" />
            </span>
            <Typography color="textSecondary" gutterBottom>
              Confirmed
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent className={styles.cardContent}>
            <span>
              <img src={recoveredIcon} alt="recovered" />
            </span>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent className={styles.cardContent}>
            <span>
              <img src={deathsIcon} alt="deaths" />
            </span>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths} duration={2.5} separator="," />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
