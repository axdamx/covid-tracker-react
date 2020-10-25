import axios from "axios";

const url = "https://covid19.mathdro.id/api";

//asyncronous fetching data
//use try catch
export const fetchData = async (country) => {
  let changeUrl = url;
  if (country) {
    changeUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeUrl);

    const modifyData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return modifyData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifyData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifyData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    const modifyData = countries.map((country) => country.name);
    return modifyData;
  } catch (error) {
    console.log(error);
  }
};
