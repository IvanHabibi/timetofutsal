var map = require('../models/map');
var weather = require('../models/weather')

module.exports = {
    place: (req, res) => {
        var tmp = {};
        map.getmap(req.body.lat, req.body.long, function(err, result) {
            if (!err) {
                tmp.place_id = result.id
                tmp.place_name = result.name
                tmp.place_address = result.formatted_address
                tmp.rate_place = result.rating
            } else {
                res.send(err);
            }
        })
        weather.getWeather(req.body.lat, req.body.long, function(result){
            // tmp.weather_place=result.current_observation.weather;
            tmp.weather_hours1=result.hourly_forecast[0].FCTTIME.pretty;
            tmp.weather_name1=result.hourly_forecast[0].condition;
            tmp.weather_hours2=result.hourly_forecast[1].FCTTIME.pretty;
            tmp.weather_name2=result.hourly_forecast[1].condition;
            tmp.weather_hours3=result.hourly_forecast[2].FCTTIME.pretty;
            tmp.weather_name3=result.hourly_forecast[2].condition;
            res.send(tmp)
        })
    }
}
