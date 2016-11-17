const Pin = require('../models/pin');
const Board = require('../models/board');

function pinsIndex(req, res) {
  Pin.find((err, pins) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(pins);
  });
}

function pinsCreate(req, res) {
  Pin.create(req.body, (err, pin) => {
    if(err) return res.status(400).json({ error: err });

    // find the board that this pin belongs to
    Board.findByIdAndUpdate(req.body.boardId, { $push: { pins: pin } }, (err) => {
      if(err) return res.status(400).json({ error: err });
      return res.json(pin);
    });
  });
}

function pinsShow(req, res) {
  Pin.findById(req.params.id, (err, pin) => {
    if(err) return res.status(500).json({ error: err });
    if(!pin) return res.status(404).json({ error: 'Not found' });
    return res.json(pin);
  });
}

function pinsUpdate(req, res) {
  Pin.findById(req.params.id, (err, pin) => {
    if(err) return res.status(500).json({ error: err });
    if(!pin) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      pin[key] = req.body[key];
    }

    pin.save((err, pin) => {
      if(err) return res.status(400).json({ error: err });
      res.json(pin);
    });
  });
}

function pinsDelete(req, res) {
  Pin.findById(req.params.id, (err, pin) => {
    if(err) return res.status(500).json({ error: err });
    if(!pin) return res.status(404).json({ error: 'Not found' });

    pin.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}


module.exports = {
  index: pinsIndex,
  create: pinsCreate,
  show: pinsShow,
  update: pinsUpdate,
  delete: pinsDelete
};
