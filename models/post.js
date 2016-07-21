var mongoose = require('mongoose');
var User     = require('./user.js');

// Users will be able to like a post created by other users
var LikeSchema = new mongoose.Schema({
  isLiked: Boolean,
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  }
});

// Users will be able to create posts for the blog portion of the app
var PostSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  },
  content:     {
    type: String,
    validate: [check500, "Must be less than 500 characters"]
  },
  photoUrl:  String,
  likes: [LikeSchema]
});

function check500(str) {
  return str.length > 0 && str.length < 500;
};

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
