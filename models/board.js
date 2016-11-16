const mongoose = require('mongoose');
// const User = require('./user');

const boardsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  // entities: { type: [pin.all], required: true, trim: true},
  tags: [{type: String, required: true, trim: true}]
  // users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Board', boardsSchema);
