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
  });
};

// create a new good
var create = function(req, res, next) {
  var good = new Good();
  good.name        = req.body.name;
  good.description = req.body.description;
  good.userID      = req.body.userID;
  good.save(function(err) {
    if (err) return res.json(err);
    res.json({message: `${good.name} saved!`});
  });
};

// update good
var update = function(req, res) {
  Good.findById(req.params.id, function(err, good) {
    if (err) res.send(err);
    // set good information if it exists in the request
    if (req.body.name)        good.name        = req.body.name;
    if (req.body.description) good.description = req.body.description;
    // userID cannot be updated
    good.save(function(err) {
      if (err) res.send(err);
      res.json({message: `${good.name} was updated.`});
    });
  });
};

// delete a good
var deleteGood = function(req, res, next) {
  var id = req.params.id;
  Good.remove({_id: id}, function(err, good) {
    res.json({message: "Good luck to you in the coming harvest."});
  });
};

module.exports = {
  index:      index,
  show:       show,
  create:     create,
  update:     update,
  deleteGood: deleteGood
};
