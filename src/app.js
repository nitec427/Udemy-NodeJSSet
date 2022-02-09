const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const port = process.env.PORT || 3000; // Either use the port provide by Heroku or use the default port
// Configuring paths to necessary locations
const public_path = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '/partials');
console.log(public_path);
hbs.registerPartials(partialsPath);
app.use(express.static(public_path));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.get('/', (req, res) => {
    res.render('index.hbs');
});
app.get('/about', (req, res) => {
    // The code below sends a JSON to the HTML page
    res.render('about', {
        title: 'About Me',
        creator: 'Embolo',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I can help you with your problem. What is your problem',
        title: 'Help Page',
        creator: 'Moise Kean',
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send('You should include search term');
    }
    res.send({ search: req.query.search, age: req.query.age });
});
app.get('/contact', (req, res) => {
    res.sendFile(public_path + '/contact.html');
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('You should include address section in  your query');
    }
    // Send your data and obtain your data back by using callback functions
    geocode(req.query.address, (err, [lat, lon, place_name]) => {
        if (err) {
            return res.send({ error });
        }
        weather(lon, lat, (error, forecastData) => {
            if (error) return res.send({ err });
            res.send({ forecast: forecastData, lat, lon, place_name });
        });
    });
});
app.get('/help/*', (req, res) => {
    res.render('nohelp', {
        message: 'This help page is not available',
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        message: 'This page is not available',
    });
});
app.listen(port, () => {
    console.log('Server is on up' + port);
});
