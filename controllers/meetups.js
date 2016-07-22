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
      meetup.goods(function(err, goods) {
        if (err) res.json(err);
        res.json({meetup, goods});
      });
    }
  });
};


// make a new meetup
var create = function(req, res, next) {
  var meetup = new Meetup();

  meetup.createdBy         = req.body._id;
  meetup.attending         = req.body.attending;
  meetup.meesageBoard      = req.body.messageBoard;
  meetup.time              = req.body.time;
  meetup.suggestedLocation = req.body.suggestedLocation;
  meetup.actualLocation    = req.body.actualLocation;

  meetup.save(function(err, savedMeetup) {
    if (err) {
      res.send(err);
    }
    console.log('Meetup Created!');
    res.json(savedMeetup);
  });
};

// update meetup
var update = function(req, res) {
  User.findById(req.params.id, function(err, user) {

    if (err) res.send(err);

    // set the new user information if it exists in the request
    if (req.body.createdBy)          user.createdBy          = req.body.createdBy;
    if (req.body.attending)          user.attending          = req.body.attending;
    if (req.body.time)               user.time               = req.body.time;
    if (req.body.suggestedLocation)  user.suggestedLocation  = req.body.suggestedLocation;
    if (req.body.actualLocation)     user.actualLocation     = req.body.actualLocation;
    if (req.body.messageBoard)       user.messageBoard       = req.body.messageBoard;
    if (req.body.isCompleted)        user.isCompleted        = req.body.isCompleted;

    // save the user
    user.save(function(err) {
      if (err) res.send(err);

      // return a message
      res.json({ message: 'User updated!' });
    });
  });
}

// delete meetup
var deleteMeetup = function(req, res, next) {
  var id = req.params.id;
  Meetup.remove({"_id" : id}, function(err) {
    if (err) {
      res.json(err);
    }
    res.json({message: "This meetup has been cancelled."});
  });
};


module.exports = {
  index:        index,
  show:         show,
  create:       create,
  update:       update,
  deleteMeetup: deleteMeetup
};



