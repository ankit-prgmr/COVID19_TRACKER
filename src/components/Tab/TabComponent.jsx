import React, { useState, useEffect } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { Public, Flag } from "@material-ui/icons";
import { fetchData, fetchNationalData, fetchDailyData } from "../../api";
import Cards from "../Cards/Cards";
import Chart from "../Chart/Chart";
import CountryPicker from "../CountryPicker/CountryPicker";
import TableList from "../TableList/TableList";
import styles from "./TabComponent.module.css";

const TabComponent = (props) => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      setData(await fetchData());
    };
    fetchedData();

    const fetchedGraphData = async () => {
      setGraphData(await fetchDailyData());
    };
    fetchedGraphData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCountry("");
    if (newValue === 0) {
      const fetchedData = async () => {
        setData(await fetchData());
      };
      fetchedData();

      const fetchedGraphData = async () => {
        setGraphData(await fetchDailyData());
      };
      fetchedGraphData();
    } else if (newValue === 1) {
      const fetchedNationalData = async () => {
        const fetchedApiData = await fetchNationalData();
        setData(fetchedApiData);
        setGraphData(fetchedApiData.dailyNationalData);
      };
      fetchedNationalData();
    }
  };

  const handleCountryChange = async (country) => {
    const retrievedData = await fetchData(country);
    setData(retrievedData);
    if (country === "") {
      const fetchedGraphData = async () => {
        setGraphData(await fetchDailyData());
      };
      fetchedGraphData();
    } else {
      setGraphData(retrievedData);
    }
    setCountry(country);
  };

  if (!data) return "Loading";
  return (
    <div className={styles.container}>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<Public />} label="WORLD" />
          <Tab icon={<Flag />} label="INDIA">
            {/* <Cards data={appState.data[0]} />
          <TableList
            data={appState.data.filter((item, index) => index !== 0)}
          />
          <Chart data={appState.caseTimeSeries} /> */}
          </Tab>
        </Tabs>
      </Paper>
      <Cards index={0} value={value} data={data} />
      <CountryPicker
        index={0}
        value={value}
        handleCountryChange={handleCountryChange}
      />
      <Chart index={0} value={value} graphData={graphData} country={country} />
      <Cards
        index={1}
        value={value}
        data={
          data.stateWiseData
            ? data.stateWiseData.find((item, index) => index === 0)
            : {}
        }
      />
      <TableList
        index={1}
        value={value}
        data={
          data.stateWiseData
            ? data.stateWiseData.filter((item, index) => index !== 0)
            : []
        }
      />
      <Chart index={1} value={value} graphData={graphData} />
    </div>
  );
};

export default TabComponent;
