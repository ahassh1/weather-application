import axios from 'axios';
import { apiKey } from '../constants';

// Build forecast API endpoint URL
const forecastEndpoint = ({ cityName, days }) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&days=${days}&aqi=no&alerts=no`;

// Build location search API endpoint URL
const locationsEndpoint = ({ cityName }) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`;

// Generic API request handler with error logging
const apiCall = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log('API call error:', err.message || err);
    return null;
  }
};

// Fetch 7-day weather forecast for a city
export const fetchWeatherForecast = (params) => {
  if (!params?.cityName || !params?.days) {
    console.warn('fetchWeatherForecast: cityName and days are required');
    return Promise.resolve(null);
  }
  return apiCall(forecastEndpoint(params));
};

// Fetch locations matching a search query
export const fetchLocations = (params) => {
  if (!params?.cityName) {
    console.warn('fetchLocations: cityName is required');
    return Promise.resolve(null);
  }
  return apiCall(locationsEndpoint(params));
};
