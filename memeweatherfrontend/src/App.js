import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Weather from "./Components/Weather/Weather";

const StyledHome = styled.div`
  h2 {
    color: red;
    text-align: center;
    margin-top: 5%;
  }
  .search_box {
    display: flex;
    justify-content: center;
  }
  input {
    text-align: center;
    color: red;
  }
  .no-weather {
    text-align: center;
    margin-top: 15%;
    font-size: 1.5rem;
    color: black;
    margin-right: 5%;
    margin-left: 5%;
  }                  
  .send-button {
    display: flex;
    justify-content: center;
    margin-top: 5%;
  }
  button {
    font-size: 1rem;
    text-align: center;
    color: white;
  }
  button:hover {
    cursor: pointer;
  }
  .btnclss{
    display:flex;
    justify-content:center;
    margin:5%;
  }

  @media only screen and (max-width: 600px) {
    h2 {
      margin-top: 10%;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    h2 {
      font-size: 2rem;
      margin-top: 10%;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    h2 {
      font-size: 2.5rem;
      margin-top: 5%;
    }
    .no-weather {
      font-size: 2rem;
    }

    button {
      font-size: 1.3rem;
    }
  
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    h2 {
      font-size: 2.5rem;
      margin-top: 5%;
    }
    .no-weather {
      margin-top: 5%;
    }
  }
`;

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

  const clearWeather = () => {
    setWeather([]);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const classes = useStyles();
  return (
    <StyledHome>
      <h2>Meme Weather</h2>
      <div className="search_box">
        {weather.length === 0 ? (
          <form
            onSubmit={submitWeather}
            className={classes.root}
            autoComplete="off"
          >
            <TextField
              type="text"
              id="standard-basic"
              className="search-bar"
              placeholder="City, State"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              color="primary"
            ></TextField>
            <div className="send-button">
              <Button
                variant="contained"
                color="primary"
                onClick={submitWeather}
              >
                {" "}
                <PersonPinIcon fontSize="small" /> Send Location
              </Button>
            </div>
          </form>
        ) : (
          <div></div>
        )}
      </div>
      {weather.length === 0 ? (
        <div className="no-weather">
          <p>
            {" "}
            <WarningIcon color="action" /> No weather to display{" "}
            <WarningIcon color="action" />
          </p>
          <p>Press Send Location to submit your city , state</p>
        </div>
      ) : (
        <Weather weather={weather} />
      )}
      {weather.length === 0 ? (
        <div></div>
      ) : (
        <div className='btnclss'>
        <Button onClick={clearWeather} variant="contained" color="primary">Clear weather</Button>
        </div>
      )}
    </StyledHome>
  );
}

export default App;
