const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJoaS1qdXlhbCIsImEiOiJja3RqczhldDMwbmVoMnBxbmt5cW1icWRnIn0.ngSKo4eP9yOdzsulNmenYw'
    request({ url, json: true }, (error, { body}) => {    //{body} is the es6 syntax this syntax directly takes body from the response object and pass as a const to the call}
        if (error) {
            callback("Uable to connect to location", undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find the location', undefined);
        }
        else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode