var mongoose = require('./database');
var User     = require('../models/user');
var Meetup   = require('../models/meetup');
var Blog     = require('../models/blog');

// users seeds:
var users = [
  {
    firstName: 'Jacob',
    lastName:  'Allen',
    email:     'jedijake@me.com',
    password:  'abc123',
    //profilePic:
    aboutMe:   "My name is Jacob, and I'm the developer responsible for homeGrown.  I hope you find it helpful when your lemon tree yields more lemons than you know what to do with.",
    zipCode:   '90042',
    admin:     true,
    rating:    5,
    goods:     [
      {
        name:        'Apples',
        description: 'Juicy, delicous, apples',
        isReady:    false,
        quantity:    'M'
      },
      {
        name:        'Sourdough Bread',
        description: 'Wholesome and nutritious sourdough bread.',
        isReady:    false,
        quantity:    'S'
      }
    ]
  },
  {
    firstName: 'Amber',
    lastName:  'Allen',
    email:     'amberlynnallen@icloud.com',
    password:  'abc123',
    //profilePic:
    zipCode:   '90042',
    admin:     false,
    rating:    5,
    goods:     [
      {
        name:        'Oranges',
        description: '"Golden Apples" from the Far East.',
        isReady:    true,
        quantity:    'L'
      }
    ]
  }
];



// remove any fish or users in the database
Meetup.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);

    // create users
    User.create(users, function(err, users) {

      // meetups seeds:
      var meetups = [
        {
          createdBy: users[0]._id,
          attending: users[1]._id
        },
        {
          createdBy: users[1]._id,
          attending: users[0]._id
        }
      ];

      // create default fishes
      Meetup.create(meetups, function(err, meetups) {

        if (err) {
          console.log(err);
        } else{
          console.log(`Database seeded with ${users.length} users and ${meetups.length} meetups`);

          // disconnect db
          mongoose.connection.close();
        }
        process.exit();
      });
    });
  });
});
