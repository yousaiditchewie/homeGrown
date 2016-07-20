var mongoose = require('mongoose');
var debug    = require('debug')('app:models');
var bcrypt   = require('bcrypt-nodejs');

// Goods refer to what a user brings to a meetup for trade
var GoodSchema = new mongoose.Schema({
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
var LikeSchema = new mongoose.Schema({
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
  likes: [LikeSchema]
});



var UserSchema = new mongoose.Schema({
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
  streetAddr:  String,
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
  goods:       [GoodSchema],
  posts:       [postSchema]
});

function check180(str) {
  return str.length > 0 && str.length < 180;
};

function check500(str) {
  return str.length > 0 && str.length < 500;
};


// exclude password
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
