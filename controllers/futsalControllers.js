var map = require('../models/map');

module.exports = {
  place: (req, res) => {
    map.getmap(req.body.lat, req.body.long, function(err, result) {
      if (!err) {
        res.send({
          place_id: result.id,
          place_name: result.name,
          place_address: result.formatted_address,
          rate_place: result.rating
        });
      } else {
        res.send(err);
      }
    })
  }
}
