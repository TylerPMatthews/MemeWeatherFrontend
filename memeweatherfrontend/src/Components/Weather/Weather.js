import React, { useState, useEffect } from "react";

const Weather = (props) => {
  const [meme, setMeme] = useState("");

  // Weather checl below needs work

//   if (
//       // Nice Weather
//     props.weather.current.condition.text === "Sunny" ||
//     "Partly cloudy" ||
//     "Clear" ||
//     ("Cloudy" && props.weather.current.temp_f > 50)
//   ) {
//     setMeme("niceweather");
//   } else if (
//       // Cold Weather
//     props.weather.current.condition.text === "Sunny" ||
//     "Partly cloudy" ||
//     "Clear" ||
//     ("Cloudy" && props.weather.current.temp_f < 40)
//   ) {
//     setMeme("coldweather");
//   }

  return (
    <div>
      <h2>
        {props.weather.location.name} , {props.weather.location.region}
      </h2>
      <p>Temp: {Math.round(props.weather.current.temp_f)}f</p>
      <p>Condition: {props.weather.current.condition.text}</p>
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
