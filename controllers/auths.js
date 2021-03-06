var User        = require('../models/user.js');
var bcrypt      = require('bcrypt-nodejs');
var jwt         = require('jsonwebtoken');
var env         = require('../config/environment');
var superSecret = env.superSecret;

/////////////////
///VERIFY USER///
var userAuth = function (req, res, next) {
  // find the user
  User.findOne({
      email: req.body.email
    }).select('email password firstName lastName aboutMe profilePic streetAddr zipCode rating goods posts')
      .exec(function(err, user) {

      if (err) res.json(err);

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
            _id:         user._id,
            email:       user.email,
            firstName:   user.firstName,
            lastName:    user.lastName,
            aboutMe:     user.aboutMe,
            profilePic:  user.profilePic,
            streetAddr:  user.streetAddr,
            zipCode:     user.zipCode,
            rating:      user.rating,
            goods:       user.goods,
            posts:       user.posts
          }, superSecret, {
            expiresIn: '30d' // expires in 30 days
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

module.exports = { userAuth, tokenVerify };
