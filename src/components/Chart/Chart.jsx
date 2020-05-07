import React from "react";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ index, value, graphData, country }) => {
  if (value !== index) return null;

  let dataset = [],
    chartTitle = "",
    isGraphDataArr = Array.isArray(graphData);

  if (graphData && index === 0 && isGraphDataArr) {
    dataset = [
      {
        data: graphData.map(({ confirmed }) => confirmed),
        label: "Confirmed",
        borderColor: "#3333FF",
        fill: true,
      },
      {
        data: graphData.map(({ deaths }) => deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.5)",
        fill: true,
      },
    ];
    chartTitle = "";
  } else if (graphData && index === 1 && isGraphDataArr) {
    dataset = [
      {
        data: graphData.map(({ confirmed }) => confirmed),
        label: "Confirmed",
        borderColor: "#3333FF",
        fill: true,
      },
      {
        data: graphData.map(({ recovered }) => recovered),
        label: "Recovered",
        borderColor: "green",
        fill: true,
      },
      {
        data: graphData.map(({ deaths }) => deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.5)",
        fill: true,
      },
    ];
    chartTitle = "Daily Cases Timeline";
  }

  const lineChart = graphData[0] ? (
    <Line
      data={{
        labels: graphData.map(({ date }) => date),
        datasets: dataset,
      }}
      options={{
        title: { display: true, text: chartTitle },
      }}
    />
  ) : null;

  const barChart = country ? (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [graphData.confirmed, graphData.recovered, graphData.deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
