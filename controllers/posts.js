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
    if (err) {
      return res.json(err);
    }
    res.json({message: "Your post is fantastic"});
  });
}

module.exports = {
  index:      index,
  show:       show,
  create:     create
  // update:     update,
  // deletePost: deletePost
};
