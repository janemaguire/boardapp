const mongoose = require('mongoose');
// const User = require('./user');

const boardsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  pins: [{type: mongoose.Schema.ObjectId, ref: 'Pin'}],
  tags: [{type: String, required: true, trim: true}],
  users: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Board', boardsSchema);
