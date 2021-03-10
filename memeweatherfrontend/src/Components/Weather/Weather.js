import React, { useState, useEffect } from "react";
import axios from "axios";
import MemeDisplay from "../MemeDisplay";
import Button from "@material-ui/core/Button";
import styled from 'styled-components';
const StyledWeather = styled.div`
  h2 {
    font-size: 1.3rem;
  }
  p {
    text-align: center;
    color: black;
  }
  .img-container {
    display: flex;
    justify-content: center;
  }
  
  img {
    width: 15rem;
    height: 15rem;
  }

  .weather-container img {
    width: 5rem;
    height: 5rem;
  }
  .clear-button{
    display:flex;
    justify-content:center;
    margin:5% 0;
    color:white
  }
`;

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
  }, [props.weather]);

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
    <StyledWeather>
      <h2>
        {props.weather.location.name} , {props.weather.location.region}
      </h2>
      <div className='clear-button'>
        {memeDisplay.length === 0 ? (
          <Button onClick={buttonClick} className='clear-button' variant="contained" color="primary">Show Weather Meme</Button>
        ) : (
          <Button onClick={clearMeme} className='clear-button' variant="contained" color="primary">Clear Weather Meme</Button>
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
    </StyledWeather>
  );
};
export default Weather;
