import React, { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";

import "../styles.css";



function App() {
  const [query, setQuery] = useState("Noida");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });


  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
      await axios
        .get(url)
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
          if(!res.data.coordinates.longitude){
            setWeather({ ...weather, data: {}, error: true });
          }
        })
        .catch((error) => {
          console.log("error", error);
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      try {
        const response = await axios.get(url);

        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="App">

      <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="enter city name and press enter"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      <button onClick={search}>Search</button>

    </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.condition && (
        // Forecast component
        <Forecast weather={weather}  />
      )}
    </div>
  );
}

export default App;
