var mongoose = require('mongoose');
var debug    = require('debug')('app:models');
var bcrypt   = require('bcrypt-nodejs');

var goodSchema = new mongoose.Schema({
  name:     {
    type:     String,
    required: true
  },
  description: {
    type:     String,
    validate: [checkLength, "Descriptions must be less than 180 characters."]
  },
  inSeason:    {
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
  goods:       [goodSchema]
});


function checkLength(str) {
  return str.length > 0 && str.length < 180;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
