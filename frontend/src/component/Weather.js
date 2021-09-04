import React,{useEffect, useState} from "react";
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import axios from 'axios';
import '../App.css'

const Weather =()=>{
    const [weather,setWeather]=useState('');
    const [temp,setTemp]=useState('');
    const [icon,setIcon]=useState('');

    const getWeather=async(e)=>{
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`).then((res) => { 
          console.log(res.data.weather[0].icon)
          setIcon(res.data.weather[0].icon)
          setWeather(res.data.weather[0].main)
          setTemp(Math.floor(res.data.main.temp-273.15))
         
        });
      }

      useEffect(()=>{
        getWeather()
      },[weather])
      
    
    return(
        <div className="weather">
          {/* <h4>현재 날씨</h4> */}
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          {/* <h4>{weather}</h4> */}
          {/* <h4>현재 온도</h4> */}
          <h4 style={{marginLeft:'35%',marginTop:'0.5%',color:"white"}}>{temp} °C</h4>
          
        </div>
    )
    
  
}

export default Weather;