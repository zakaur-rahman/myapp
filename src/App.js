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
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleKeyPress} 
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
            <div>
              <div className="location" style={{ flexDirection: 'column' }}>
                {data != null ? (
                  <p>{data.city}, {data.country}</p>
                ) : null}
              </div>
              <div className="temp">
                {data != null ? (
                  <p className="tempt"> {data.temp}°C</p>
                ) : null}
              </div>
              <div className="bottom">
                <div className="feels">
                  <p>Feels Like</p>
                  {data != null ? (
                    <p className="bold"> {data.feelslike}°C</p>
                  ) : null}
                </div>
                <div className="humidity">
                  <p>Humidity</p>
                  {data != null ? (
                    <p className="bold">{data.humidity}%</p>
                  ) : null}
                </div>
                <div className="wind">
                  <p>Condition</p>
                  {data != null ? (
                    <p className="bold">{data.condition}</p>
                  ) : null}
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
