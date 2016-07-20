// Require resource's model(s).
var User = require("../models/user");

/////////////////
///VERIFY USER///
var userAuth = function (req, res, next) {
  // find the user
  User.findOne({
      email: req.body.email
    }).select('email password first name').exec(function(err, user) {

      if (err) throw err;

      // no user with that phone number was found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign({
            email:       user.email,
            firstName:   user.firstnName,
            _id:         user._id
          }, superSecret, {
            expiresInMinutes: 180 // expires in 3 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user
          });
        }

      }

    });
  };

//////////////////
///VERIFY TOKEN///
var tokenVerify = function(req, res, next) {
  // do logging
  console.log('Somebody just accessed the homeGrown API!');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
      });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next(); // make sure we go to the next routes and don't stop here
      }
    });

  } else {

    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

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
  deleteUser: deleteUser
};
