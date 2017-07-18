var mongoose = require('mongoose');

var GoodsSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true
  },
  description: {
    type: String,
    validate: [check1000, 'Sorry, a description must have fewer than 1000 characters.']
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  }
});

// verify description is less than 1000 characters
function check1000(str) {
  return str.length > 0 && str.length < 180;
}
