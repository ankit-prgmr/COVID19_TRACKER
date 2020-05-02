import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const indiaURL = "https://api.covid19india.org/";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const { data } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed: data.confirmed.value,
      recovered: data.recovered.value,
      deaths: data.deaths.value,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    const countryData = countries.map((country) => country.name);
    return countryData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNationalData = async () => {
  try {
    const { data } = await axios.get(`${indiaURL}/data.json`);
    const stateWiseData = data.statewise.map(
      ({
        confirmed,
        recovered,
        deaths,
        active,
        deltaconfirmed,
        deltadeaths,
        deltarecovered,
        state: stateName,
        lastupdatedtime: lastUpdate,
      }) => {
        return {
          confirmed: +confirmed,
          recovered: +recovered,
          deaths: +deaths,
          active: +active,
          deltaconfirmed: +deltaconfirmed,
          deltadeaths: +deltadeaths,
          deltarecovered: +deltarecovered,
          stateName,
          lastUpdate,
        };
      }
    );

    const dailyNationalData = data.cases_time_series.map(
      ({ dailyconfirmed, dailydeceased, dailyrecovered, date }) => {
        return { dailyconfirmed, dailydeceased, dailyrecovered, date };
      }
    );
    return { stateWiseData, dailyNationalData };
  } catch (error) {
    console.log(error);
  }
};
