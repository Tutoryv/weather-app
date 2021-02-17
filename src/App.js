import "./App.css";
import { countries as countriesData } from "./data/countries";
import sky from "./images/sky.jpg";
import Select from "react-select";
import { useState } from "react";
import apiKey from "./data/api";

const callApi = {
  key: apiKey,
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [countries, setCountries] = useState(countriesData);
  const [selectedCoutry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({});

  const createDate = () => {
    let today = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const onSubmit = () => {
    if (selectedCoutry === "" || selectedCity === "") return;
    fetch(
      `${callApi.base}weather?q=${selectedCity},${selectedCoutry}&appid=${callApi.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeatherInfo(result);
      })
      .catch((error) => {
        console.log("Error connection to the database: " + error);
      });
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${sky})` }}>
      <h1 className="app-title">Weather App</h1>
      <div className="main-container">
        <div className="form-container">
          <div style={{ width: "100%" }}>
            <Select
              options={countries}
              onChange={(e) => setSelectedCountry(e.value)}
              placeholder="Country"
            />
          </div>
          <input
            type="text"
            className="city-input"
            placeholder="City"
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
            value={selectedCity}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
          />
          <div className="submit" onClick={() => onSubmit()}>
            Check
          </div>
        </div>
        <div className="info-container">
          <h1 className="date">{createDate()}</h1>
          {typeof weatherInfo.main != "undefined" ? (
            <div>
              <h2 className="city">
                {weatherInfo.name}, {weatherInfo.sys.country}
              </h2>
              <div className="temp-container">
                <h2 className="temp">{weatherInfo.main.temp} F°</h2>
              </div>
              <h2 className="weather">{weatherInfo.weather[0].main}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
