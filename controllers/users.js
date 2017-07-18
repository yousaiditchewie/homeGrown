// Require resource's model(s).
var User = require("../models/user");

// view all users
var index = function(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(users);
    }
  });
};

// view selected user
var show = function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(user);
    }
  });
};

// create new user
var create = function(req, res, next) {
  var user = new User();
  user.firstName  = req.body.firstName;
  user.lastName   = req.body.lastName;
  user.email      = req.body.email;
  user.password   = req.body.password;
  user.aboutMe    = req.body.aboutMe;
  user.profilePic = req.body.profilePic;
  user.streetAddr = req.body.streetAddr;
  user.zipCode    = req.body.zipCode;
  user.save(function(err) {
    if (err) {
      if(err.code == 11000)
        return res.json({success: false, message: 'That email is already in our system!'});
    } else {
      return res.json(err);
    }
    res.json({message: "Welcome to homeGrown!"});
  });
};

// update user
var update = function(req, res) {
  User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);
        // set the new user information if it exists in the request
        if (req.body.firstName)   user.firstNname  = req.body.firstNname;
        if (req.body.lastName)    user.lastName    = req.body.lastName;
        if (req.body.email)       user.email       = req.body.email;
        if (req.body.password)    user.password    = req.body.password;
        if (req.body.aboutMe)     user.aboutMe     = req.body.aboutMe;
        if (req.body.profilePic)  user.profilePic  = req.body.profilePic;
        if (req.body.streetAddr)  user.streetAddr  = req.body.streetAddr;
        if (req.body.zipCode)     user.zipCode     = req.body.zipCode;
        // save the user
        user.save(function(err) {
          if (err) res.send(err);
          // return a message
          res.json({ message: 'User updated!' });
        });
  });
};

// delete a user
var deleteUser = function(req, res, next) {
  var id = req.params.id;
  User.remove({_id: id}, function(err, user) {
    if (err) res.send(err);
    res.json({message: "Goodbye.  Thanks for using homeGrown."});
  });
};

module.exports = {
  index:      index,
  show:       show,
  create:     create,
  update:     update,
  deleteUser: deleteUser
};
