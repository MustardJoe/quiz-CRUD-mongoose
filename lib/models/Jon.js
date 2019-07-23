const mongoose = require('mongoose');

const jonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Jon = mongoose.model('Jon', jonSchema);

module.exports = Jon;