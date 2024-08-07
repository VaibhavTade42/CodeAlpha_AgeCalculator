import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../WeatherForecast/WeatherForecast.css';
import { useNavigate, Link } from 'react-router-dom';
import { handleSuccess } from '../Utils/util';
import {ToastContainer} from 'react-toastify'



const WeatherForecast = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const[loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      setLoggedInUser(localStorage.getItem('loggedInUser'));
  
    },[])

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const indianCities = [
        'Select Indian City',
        'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 
        'Noida', 'Mumbai', 'Kolkata', 'Ahmedabad', 'Trivandrum'
    ];

    const worldCities = [
        'Select World City',
        'San Francisco, USA', 'Seattle, USA', 'New York City, USA', 
        'Austin, USA', 'Boston, USA', 'London, United Kingdom', 
        'Berlin, Germany', 'Amsterdam, Netherlands', 'Tel Aviv, Israel', 
        'Toronto, Canada', 'Vancouver, Canada', 'Sydney, Australia', 
        'Singapore, Singapore', 'Tokyo, Japan', 'Shanghai, China'
    ];

    useEffect(() => {
        if (selectedCity) {
            const fetchWeather = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`);
                    setWeather(response.data);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchWeather();
        }
    }, [selectedCity, apiKey]);

    const handleCityChange = (event) => {
        const value = event.target.value;
        if (event.target.id === 'indianCities') {
            setSelectedList('indian');
            setSelectedCity(value === 'Select Indian City' ? null : value);
        } else {
            setSelectedList('world');
            setSelectedCity(value === 'Select World City' ? null : value);
        }
    };

    const getWeatherIcon = (description) => {
        switch (description) {
            case 'clear sky': return '☀️';
            case 'few clouds': return '🌤️';
            case 'scattered clouds': return '🌥️';
            case 'broken clouds': return '☁️';
            case 'shower rain': return '🌧️';
            case 'rain': return '🌦️';
            case 'thunderstorm': return '⛈️';
            case 'snow': return '❄️';
            case 'mist': return '🌫️';
            default: return '🌡️';
        }
    };

    const handleLogout = (e) => {
        const user = localStorage.getItem('loggedInUser')
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('loggedInUser');
        handleSuccess(`${user} Loggedout successfully`);
        setTimeout(() => {
            navigate('/login');
        }, 1500)
      }

    return (
        <div className="weather-forecast-w">
            <h2>Weather Forecast</h2>
            <div className="form-group-w" >
                <label htmlFor="indianCities-w" id = "lableSelectIndCity-w">Select Indian City</label>
                <select 
                    className="form-control-w" 
                    id="indianCities-w" 
                    onChange={handleCityChange}
                    value={selectedList === 'indian' ? selectedCity : 'Select Indian City'}
                >
                    {indianCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="form-group-w">
                <label htmlFor="worldCities-w" id = "labelSelectWorldCity-w">Select World City</label>
                <select 
                    className="form-control-w" 
                    id="worldCities-w" 
                    onChange={handleCityChange}
                    value={selectedList === 'world' ? selectedCity : 'Select World City'}
                >
                    {worldCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {!selectedCity && (
                <p>Please select a city from one of the lists.</p>
            )}
            {loading && <p>Loading weather data...</p>}
            {error && <p>Error fetching weather data: {error.message}</p>}
            {weather && (
                <div className="weather-details-w">
                    <h3>Weather in {weather.name}</h3>
                    <p>
                        <strong>Temperature:</strong> {weather.main.temp} °C {getWeatherIcon(weather.weather[0].description)}
                    </p>
                    <p><strong>Weather:</strong> {weather.weather[0].description}</p>
                    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                </div>
            )}
            <button onClick={handleLogout} className='logoutbutton-w'>Logout</button>
            <ToastContainer />
        </div>
    );
};

export default WeatherForecast;
