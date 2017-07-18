var express = require('express');
var router  = new express.Router();

// Require controllers.
// var pagesController   = require('../controllers/pages');
var UsersController   = require('../controllers/users');
var MeetupsController = require('../controllers/meetups');
var PostsController   = require('../controllers/posts');
var AuthsController   = require('../controllers/auths');
var GoodsControler    = require('../controllers/goods');
// root path:
// router.get('/', pagesController.welcome);

// login route
router.post('/login',          AuthsController.userAuth);

// users resource paths:
router.get('/users',           UsersController.index);
router.get('/users/:id',       UsersController.show);
router.post('/users',          UsersController.create);
router.put('/users/:id',       UsersController.update);
router.delete('/users/:id',    UsersController.deleteUser);

// meetups resource paths:
router.get('/meetups',         MeetupsController.index);
router.get('/meetups/:id',     MeetupsController.show);
router.post('/meetups',        MeetupsController.create);
router.put('/meetups/:id',     MeetupsController.update);
router.delete('/meetups/:id',  MeetupsController.deleteMeetup);

// posts resource paths:
router.get('/posts',           PostsController.index);
router.get('/posts/:id',       PostsController.show);
router.post('/posts',          PostsController.create);
router.delete('/posts/:id',    PostsController.deletePost);

// goods resource paths;
router.get('/goods',           GoodsController.index);
router.get('/goods/:id',       GoodsController.show);
router.post('/goods',          GoodsController.create);
router.put('/goods/:id',       GoodsController.update);
router.delete('/goods/:id',    GoodsController.deleteGood);

module.exports = router;
