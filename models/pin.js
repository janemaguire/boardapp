const mongoose  = require('mongoose');

const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true }
});

module.exports = mongoose.model('Pin', pinSchema);
