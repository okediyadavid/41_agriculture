// Node.js server to fetch weather data
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));


// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  const { state } = req.query;
  const weatherData = await fetchWeatherData(state);
  res.json(weatherData);
});

// Function to fetch weather data from the weather API
async function fetchWeatherData(state) {
  // Use Axios to make a request to the weather API
  
  const API_KEY = '0c7163e88372a06439b048f5410cf3e2';
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}`;
  try {
    const response = await axios.get(weatherAPIUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { error: 'An error occurred while fetching weather data' };
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
