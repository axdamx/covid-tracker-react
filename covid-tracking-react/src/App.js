import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImg from "./images/image.png";

function App() {
  //async await function with useEffect
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  useEffect(() => {
    async function fetchDataAPI() {
      // You can await here
      const data = await fetchData();
      setData(data);
    }
    fetchDataAPI();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  };

  return (
    <div className={styles.container}>
      <img src={coronaImg} alt="COVID-19" className={styles.image} />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
