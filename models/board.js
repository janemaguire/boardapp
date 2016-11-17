const mongoose = require('mongoose');
// const User = require('./user');

const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true }
});

const boardsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  pins: [ pinSchema ],
  tags: [{ type: String, required: true, trim: true }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Board', boardsSchema);
