var Post = require('../models/post');

// show all posts
var index = function(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(posts);
    }
  });
};

// view selected post
var show = function(req, res, next){
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.json({message: "Could not find post because " + err});
    } else if (!post) {
      res.json({message: "No such post"});
    } else {
      res.json(post);
    }
  });
};

// create a new post
var create = function(req, res, next) {
  var post = new Post();
  post.createdBy = req.body.createdBy;
  post.content   = req.body.content;
  post.photoUrl  = req.body.photoUrl;
  post.likes     = req.body.likes;

  post.save(function(err) {
    if (err) return res.json(err);
    res.json({message: "Nice Post"});
  });
};

// users cannot update posts at this time
// maybe in homeGrown II: The Search for More Money...

// delete a post
var deletePost = function(req, res, next) {
  var id = req.params.id;
  Post.remove({_id: id}, function(err, post) {
    if (err) {
      res.send(err)
    };
    res.json({message: "That post is ghost"});
  });
};

module.exports = {
  index:      index,
  show:       show,
  create:     create,
  deletePost: deletePost
};
