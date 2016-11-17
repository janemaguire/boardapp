const Board = require('../models/board');

function boardsIndex(req, res) {
  Board.find((err, boards) => {
    if(err) return res.status(500).json({ error: err});
    return res.json(boards);
  });
}

function boardsCreate(req, res) {
  req.body.user = req.user;

  Board.create(req.body, (err, board) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(board);
  });
}

function boardsShow(req, res) {
  Board.findById(req.params.id)
  .populate('pins')
  .exec((err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    return res.json(board);
  });
}

function boardsUpdate(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      board[key] = req.body[key];
    }

    board.save((err, board) => {
      if(err) return res.status(400).json({ error: err });
      res.json(board);
    });
  });
}

function boardsDelete(req, res) {
  Board.findById(req.params.id, (err, board) => {
    if(err) return res.status(500).json({ error: err });
    if(!board) return res.status(404).json({ error: 'Not found' });

    board.remove(err => {
      if(err) return res.status(500).json({ error: err });
      res.status(204).send();
    });
  });
}

module.exports = {
  index: boardsIndex,
  create: boardsCreate,
  show: boardsShow,
  update: boardsUpdate,
  delete: boardsDelete
};
