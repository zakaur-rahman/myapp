import './App.css';
import {  useState } from 'react';
import axios from 'axios'

function App() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState(null)

  

  const getWeather = async () => {
    const data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=66133e7f94c14cbab79134247232608&q=${location}&aqi=yes`)
    
    setData(data.data)
  }

  console.log(data);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          type="text" />
          <button className='btn' onClick={getWeather} >Search</button>
      </div>
      <div className="container">
        <div className="top">
          {/* <div className="location">
            <p>{ data != null ? data.name : "--"}</p>
          </div> */}
          <div className="temp bottom">
            {data != null ? <h1>{data.location["name"]}  {data.current.temp_c}°C</h1> : <h1>-- --°C</h1>}
          </div>
          <div className="bottom">
            <div className="feels">
              {data != null ? <p className='bold'>{data.current.feelslike_c}°C</p> : <p className='bold'>--°C</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data != null ? <p className='bold'>{data.current.humidity}%</p> : <p className='bold'>-- %</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data != null ? <p className='bold'>{data.current.condition["text"]}</p> : <p className='bold'>--</p>}
              <p>Condition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
