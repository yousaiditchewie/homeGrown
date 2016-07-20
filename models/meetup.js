var mongoose = require('mongoose');
var User     = require('./user.js');


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

var meetupSchema = new mongoose.Schema({
  createdBy:          {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attending:          [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User'
    }
  ],
  time:               Date,
  suggestedLocation:  String,
  actualLocation:     String,
  messageBoard:       [messageSchema],
  isCompleted:        {
    type: Boolean,
    default: false
  }
});


function checkLength(str){
  return str.length >= 0 && str.length < 400;
};

meetupSchema.methods.goods = function(callback) {
  let meetUpUsers = this.attending;
  meetUpUsers.push(this.createdBy);
  mongoose.model('User').find({
    "_id": {$in: meetUpUsers}
  }, function(err, users) {
    if (err) console.log(err);
    let goods = [];
    users.forEach(e => {
      goods.push(...e.goods);
    });
    console.log("GOODS! ", goods);
    console.log("USERS! ", users);
    goods = goods.filter(e => e.isReady);
    callback(err, goods);
  })
}

var Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;
