require('dotenv').config();

var Wunderground = require('wundergroundnode');
var myKey = process.env.KEY;
var wunderground = new Wunderground(myKey);

module.exports = {
    getWeather(lat,long,callback){
        // wunderground.conditions().geolookup().request('-6.2607187,106.78161620000003', function(err, response){
        wunderground.hourlyForecast().geolookup().request(`${lat},${long}`, function(err, response){
        // console.log(response);
        // res.json(response.current_observation.weather)
        callback(response)
    })
    }
}
