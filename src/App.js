import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchNationalData } from "./api";
import coronaImage from "./images/image.png";
import TabComponent from "./components/Tab/TabComponent";

class App extends Component {
  state = {
    data: {},
    stateWiseData: [],
    dailyNationalData: [],
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedNationalData = await fetchNationalData();
    this.setState({
      data: fetchedData,
      stateWiseData: fetchedNationalData.stateWiseData,
      dailyNationalData: fetchedNationalData.dailyNationalData,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        {/* <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> */}
        <TabComponent />
      </div>
    );
  }
}

export default App;
