import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api-weather-m8vk.onrender.com/weather/?location=${location}`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setData(null)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button className="btn" onClick={getWeather}>
          Search
        </button>
      </div>

      {error != null ? (
        
        <h5 style={{ color: 'red', textAlign: 'center' }}>{error}</h5>
      ) : null}

      <div className="container">
        <div className="top">
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div >

            <div className="bottom" style={{ flexDirection: 'column' }}>
              {data != null ? (
                <>
                  <h1>
                    {data.city}, {data.country}
                  </h1>
                  <h1>{data.temp}°C</h1>
                </>
              ) : (
                <>
                  <h1>--</h1>
                  <h1>--°C</h1>
                </>
              )}
            </div>

          <div className="bottom">
            <div className="feels">
              {data != null ? (
                <p className="bold">{data.feelslike}°C</p>
              ) : (
                <p className="bold">--°C</p>
              )}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data != null ? (
                <p className="bold">{data.humidity}%</p>
              ) : (
                <p className="bold">-- %</p>
              )}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data != null ? (
                <p className="bold">{data.condition}</p>
              ) : (
                <p className="bold">--</p>
              )}
              <p>Condition</p>
            </div>
          </div>
          </div>

          )}
          
        </div>
      </div>
    </div>
  );
}

export default App;
