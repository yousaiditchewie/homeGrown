var mongoose = require('mongoose');
var User     = require('./user.js');

var blogSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  },
  blogs:     {
    type: String,
    validate: [checkLength, "Must be less than 500 characters"]
  },
  photoUrl:  String
});

function checkLength(str) {
  return str.length > 0 && str.length < 500;
};

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
