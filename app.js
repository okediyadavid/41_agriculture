const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WeatherModel = require('./model'); // Adjust the path based on your file structure

const app = express();
const port = 8060;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://david:adeoluwa@threecu-cluster.spun2fl.mongodb.net/threecu?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a function to store weather data
const storeWeatherData = async (cityName, weatherData) => {
    try {
        const { temperature, windSpeed, humidity } = weatherData.main;

        const newWeatherData = new WeatherModel({
            city: cityName,
            temperature: temperature - 273.15, // Convert temperature to Celsius
            windSpeed: windSpeed,
            humidity: humidity
        });

        await newWeatherData.save();
        console.log('Weather data stored in MongoDB');
    } catch (err) {
        console.error(err);
        console.error('Error storing weather data in MongoDB');
    }
};

// Define a route to save weather data to MongoDB
app.post('/weather', async (req, res) => {
    try {
        const { cityName, weatherData } = req.body;
        await storeWeatherData(cityName, weatherData);
        res.status(201).send('Weather data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving weather data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
