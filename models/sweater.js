var mongoose = require('mongoose');

var SweaterSchema = new mongoose.Schema({
  name: String,
  gender: String,
  holiday: String,
  picture: String,
  price: Number,
  link: String
});

module.exports = mongoose.model('Sweater', SweaterSchema);