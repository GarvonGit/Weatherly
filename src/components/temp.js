import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Dewas");
  const [tempInfo, setTempInfo] = useState({});

  //using async await to fetch the data from the api
  const getWeatherInfo = async () => {
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a560b244567b8df79618c3fa33b6a022`;
      //your api 

      let res = await fetch(url);     //fetching the data from the api as a response
      let data = await res.json();    //converting the response into json format

      const { temp, humidity, pressure } = data.main;  //destructuring the data from the API
      const { main: weathermood } = data.weather[0];  
      const { name } = data;                                    
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,                 //storing the data in the form of object
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

//useEffect hook is used for displaying the weather info of the city which is written in the search box by default
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"      //search button which will call getWeatherInfo function to get the weather info of that city if it is valid
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;