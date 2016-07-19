var express = require('express');
var router  = new express.Router();

// Require controllers.
var pagesController   = require('../controllers/pages');
var usersController   = require('../controllers/users');
var meetupsController = require('../controllers/meetups');
// root path:
// router.get('/', pagesController.welcome);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

// meetups resource paths:
router.get('/meetups',     meetupsController.index);
router.get('/meetups/:id', meetupsController.show);

module.exports = router;
