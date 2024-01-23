// model.js (assuming it's your model file)
{
    "_id": ObjectId("65ae5d85357df689d52180aa"),
    "city": "Lagos",
    "temperature": 28.5,
    "windSpeed": 5.2,
    "humidity": 75
  }
  

const mongoose = require('mongoose');


const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    windSpeed: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
});

const WeatherModel = mongoose.model('Weather', weatherSchema);

module.exports = WeatherModel;
