const request = require('request');
const geocode = (address, callback) => {
    // When geocode finishes execution callback obtain its inputs
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2V0aW5pMTgiLCJhIjoiY2t6OHhkY3ptMGFjMDJubXFhaHd4bWl6eCJ9.GJQOHc2dkNKFoU5lLlMLOw';

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('No connection!', undefined);
        } else if (res.body.features.length === 0) {
            callback('No location was found', undefined);
        } else {
            let [lat, lon] = res.body.features[0].center;
            let place_name = res.body.features[0].place_name;
            callback(undefined, [lat, lon, place_name]);
        }
    });
};
module.exports = geocode;
