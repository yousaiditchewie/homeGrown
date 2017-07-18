var Good = require('../models/good');

// show all goods
var index = function(req, res, next) {
  Good.find({}, function(err, goods) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(goods);
    }
  });
};

// view selected good
var show = function(req, res, next) {
  Good.findById(req.params.id, function(err, good){
    if (err) {
      res.json({message: "Sorry, couldn't find that one.  Server says, '" + err + "'"});
    } else if (!good) {
      res.json({message: "Couldn't find that one. Try again..."});
    } else {
      res.json(good);
    }
  })
}
