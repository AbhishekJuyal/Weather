const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9af0a6dccd51e4de60455fbd426c606b&query=" + lattitude + ',' + longitude + "&unit=f"
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback(error, undefined);
        }
        else if (body.error) {
            callback("unable to connect to the server",undefined)
        }
        else {
            callback(undefined,{
                temp:body.current.temperature,
                outside_temp:body.current.feelslike,
                weather:body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast;