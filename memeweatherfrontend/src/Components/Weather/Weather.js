import React, { useState, useEffect } from "react";
import axios from "axios";
import MemeDisplay from "../MemeDisplay";

const Weather = (props) => {
  //Sets state to be searched from backend depending on weather
  const [meme, setMeme] = useState("");
  //Sets the meme to state
  const [memeDisplay, setMemeDisplay] = useState([]);

  //checks the weather condition and sets state
  const conditionCheck = (check) => {
    if (
      check === "Sunny" ||
      check === "Clear" ||
      check === "Cloudy" ||
      check === "Partly cloudy"
    ) {
      setMeme("niceweather");
    } else if (
      check === "Rain" ||
      check === "Light rain" ||
      check === "Heavy rain" ||
      check === "Mist"
    ) {
      setMeme("rainweather");
    } else if (
      check === "Snow" ||
      check === "Light snow" ||
      check === "Heavy snow" ||
      check === "Patchy light snow" ||
      check === "Blizzard"
    ) {
      setMeme("snoweather");
    }
  };

  //runs the weather check function
  useEffect(() => {
    conditionCheck(props.weather.current.condition.text);
  }, []);

  //button to get a meme from the backend
  const buttonClick = () => {
    axios
      .get(`https://meme-weather-backend.herokuapp.com/api/${meme}`)
      .then((res) => {
        setMemeDisplay(res.data);
      })
      .catch((err) => {
        console.log("Axios get meme error", err);
      });
  };

  //grabs a random meme from state
  const randomWeather =
    memeDisplay[Math.floor(Math.random() * memeDisplay.length)];

  //clears the meme state
  const clearMeme = () => {
    setMemeDisplay([]);
  };

  return (
    <div>
      <h2>
        {props.weather.location.name} , {props.weather.location.region}
      </h2>
      <div>
        {memeDisplay.length === 0 ? (
          <button onClick={buttonClick}>Show Weather Meme</button>
        ) : (
          <button onClick={clearMeme}>Clear</button>
        )}
      </div>
      <p>Temp: {Math.round(props.weather.current.temp_f)}f</p>
      <p>Condition: {props.weather.current.condition.text}</p>
      <div className="meme-container">
        {memeDisplay.length === 0 ? (
          <div></div>
        ) : (
          <MemeDisplay randomWeather={randomWeather} />
        )}
      </div>
      <div className="img-container">
        <img
          src={props.weather.current.condition.icon}
          alt={props.weather.current.condition.code}
        />
      </div>
      <p>Wind MPH: {props.weather.current.wind_mph} mph</p>
      <p>Wind Direction: {props.weather.current.wind_dir}</p>
      <p>Humidity: {props.weather.current.humidity} %</p>
      <p>Feels like: {Math.round(props.weather.current.feelslike_f)} f</p>
    </div>
  );
};
export default Weather;
