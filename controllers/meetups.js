var Meetup = require('../models/meetup');

var index = function(req, res, next) {
  Meetup.find({}, function(err, meetups) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(meetups);
    }
  });
};

var show = function(req, res, next) {
  Meetup.findById(req.params.id, function(err, meetup) {
    if (err) {
      res.json({message: 'Cannot find the meetup cuz ' + err });
    } else if (!meetup) {
      res.json({message: 'No meetup with this ID.'});
    } else {
      res.json(meetup);
    }
  });
};

module.exports = {
  index: index,
  show:  show
};
