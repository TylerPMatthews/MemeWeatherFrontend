import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Weather from "./Components/Weather/Weather";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const submitWeather = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=10cae7ec92fa4e47ac933047200611&q=${query}&days=1 `
      )
      .then((res) => {
        setWeather(res.data);
        setQuery("");
      })
      .catch((err) => {
        console.log("Weather get error", err);
      });
  };
  return (
    <div className="App">
      <h2>Meme Weather</h2>
      <div className="search_box">
        <form onSubmit={submitWeather}>
          <input
            type="text"
            placeholder="City , State"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
          <button>Submit</button>
        </form>
      </div>
      {weather.length === 0 ? <div></div> : <Weather weather={weather} />}
    </div>
  );
}

export default App;
