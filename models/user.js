var mongoose = require('mongoose');
var debug    = require('debug')('app:models');
var bcrypt   = require('bcrypt-nodejs');

// Goods refer to what a user brings to a meetup for trade
var goodSchema = new mongoose.Schema({
  name:     {
    type:     String,
    required: true
  },
  description: {
    type:     String,
    validate: [check180, "Descriptions must be less than 180 characters."]
  },
  isReady:    {
    type:    Boolean,
    default: false
  },
  quantity:    {
    type:      String,
    required:  true,
    default:   'S',
    enum:      ['S', 'M', 'L', 'XL']
  }
});

// Users will be able to like a post created by other users
var likeSchema = new mongoose.Schema({
  isLiked: Boolean,
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  }
});

// Users will be able to create posts for the blog portion of the app
var postSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  },
  blogs:     {
    type: String,
    validate: [check500, "Must be less than 500 characters"]
  },
  photoUrl:  String,
  likes: [likeSchema]
});



var userSchema = new mongoose.Schema({
  firstName:   {
    type:     String,
    required: true
  },
  lastname:    String,
  email:       {
    type:     String,
    required: true,
    unique:   true
  },
  password:    {
    type:     String,
    required: true,
    select:   false
  },
  aboutMe:     {
    type: String,
    validate: [check180, 'Must have less than 180 characters.']
  },
  profilePic:  String,
  zipCode:     {
    type:      String,
    required:  true,
    maxLength: 5,
    minLength: 5
  },
  admin:       {
    type:    Boolean,
    default: false
  },
  rating:      {
    type:    Number,
    default: 5
  },
  goods:       [goodSchema],
  posts:       [postSchema]
});

function check180(str) {
  return str.length > 0 && str.length < 180;
};

function check500(str) {
  return str.length > 0 && str.length < 500;
};


var User = mongoose.model('User', userSchema);

module.exports = User;
