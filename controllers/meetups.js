var Meetup = require('../models/meetup');

// view all meetups
var index = function(req, res, next) {
  Meetup.find({}, function(err, meetups) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(meetups);
    }
  });
};

// view selected meetup
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


// make a new meetup
var create = function(req, res, next) {
  var meetup = new Meetup();
  meetup.save(function(err, savedMeetup) {
    if (err) {
      res.send(err);
    }
    console.log('Meetup Created!');
    res.json(savedMeetup);
  });
};

// delete meetup
var deleteMeetup = function(req, res, next) {
  var id = req.params.id;
  Meetup.remove({"_id" : id}, function(err) {
    if (err) {
      res.json(err);
    }
    res.json({message: "This meetup has been cancelled."});
  })
};


module.exports = {
  index:        index,
  show:         show,
  create:       create,
  deleteMeetup: deleteMeetup
};



