require('dotenv').config();
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_KEY
});
module.exports = {
  getmap: (lat, long, callback) => {
    googleMapsClient.places({
      query: 'futsal',
      location: [lat, long],
      radius: 1000,
      opennow: true
    }, function(err, response) {
      if (!err) {
        // callback(null, response.json.results[0]);
        googleMapsClient.place({
          placeid: response.json.results[0].place_id
        }, function(err, responses) {
          if (!err) {
            callback(null, responses.json.result);
          } else {
            callback({
              message: 'Error getmapdetail.'
            }, null);
          }
        });
      } else {
        callback({
          message: 'Error getmap.'
        }, null);
      }
    });
  }
}
