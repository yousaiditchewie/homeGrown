var express = require('express');
var router  = new express.Router();

// Require controllers.
var pagesController   = require('../controllers/pages');
var UsersController   = require('../controllers/users');
var MeetupsController = require('../controllers/meetups');
// root path:
// router.get('/', pagesController.welcome);

// users resource paths:
router.get('/users',        UsersController.index);
router.get('/users/:id',    UsersController.show);
router.post('/users',       UsersController.create);
router.delete('/users/:id', UsersController.deleteUser);

// meetups resource paths:
router.get('/meetups',     MeetupsController.index);
router.get('/meetups/:id', MeetupsController.show);
router.post('/meetups',    MeetupsController.create);
router.delete('/meetups/:id',  MeetupsController.deleteMeetup);

module.exports = router;
