require('dotenv').config();
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});
module.exports = {
  getmap: (lat, long, callback) => {
    googleMapsClient.places({
      query: 'futsal',
      location: [lat, long],
      radius: 10,
      opennow: true
    }, function(err, response) {
      if (!err) {
        callback(null, response.json.results[0]);
      } else {
        callback({
          message: 'Error getmap.'
        }, null);
      }
    });
  }
}
