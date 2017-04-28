var map = require('../models/map');
var weather = require('../models/weather');
var twett = require('../models/twitter');

module.exports = {
  place: (req, res) => {
    var tmp = {};
    map.getmap(req.body.lat, req.body.long, function(err, maps) {
      if (!err) {
        tmp.place_id = maps.id
        tmp.place_name = maps.name
        tmp.rate_place = maps.rating
        tmp.place_opening_hours = maps.opening_hours.weekday_text
        tmp.place_address = maps.formatted_address
        tmp.place_phone_number = maps.formatted_phone_number
        tmp.place_url = maps.url
        weather.getWeather(req.body.lat, req.body.long, function(result) {
          // tmp.weather_place = result.current_observation.weather;
          tmp.weather_hours1 = result.hourly_forecast[0].FCTTIME.pretty;
          tmp.weather_name1 = result.hourly_forecast[0].condition;
          tmp.weather_hours2 = result.hourly_forecast[1].FCTTIME.pretty;
          tmp.weather_name2 = result.hourly_forecast[1].condition;
          tmp.weather_hours3 = result.hourly_forecast[2].FCTTIME.pretty;
          tmp.weather_name3 = result.hourly_forecast[2].condition;
          var str = `Saya akan bermain futsal di ${maps.name} dengan cuaca saat ini ${tmp.weather_name1}. Find Me!! ${maps.url}`
          twett.posting(str);
          res.send(tmp)
        })
      } else {
        res.send(err);
      }
    })
  }
}
