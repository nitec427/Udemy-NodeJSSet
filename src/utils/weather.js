const request = require('request');

const weatherForecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1d7a7b85c09aef7334df40d7ac3d9d93&query=' + lat + ',' + lon + '&units=f';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Network error', undefined);
        } else if (response.body.error) {
            callback('Your request caused this problem: ' + response.body.error.type + '\n' + response.body.error.info, undefined);
        } else {
            // Write an alert with data descriptions
            data = response.body.current;
            callback(undefined, `${data.weather_descriptions[0]}. It is ${data.temperature} degrees fahrenheit now. It feels like ${data.feelslike}`);
        }
    });
};

module.exports = weatherForecast;
