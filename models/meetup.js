var mongoose = require('mongoose');
var User     = require('./user.js');


var meetupSchema = new mongoose.Schema({
  createdBy:          {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attending:          [attendingSchema],
  time:               Date,
  suggestedLocation:  String,
  actualLocation:     String,
  messageBoard:       [messageSchema],
  isCompleted:        Boolean
});

var attendingSchema = new mongoose.Schema({
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  }
});

var messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    validate: [checkLength, "Messages must be less than 400 characters."]
  },
  isAppropriate: {
    type:    Boolean,
    default: true
  }
});

function checkLength(str){
  return str.length > 0 && str.length < 400;
};

var Meetup = mongoose.model('Meetup', userSchema);

module.exports = Meetup;
