const mongoose = require('mongoose');

const { Schema } = mongoose;

const workSchema = new Schema({
    userId: {
      type: Number,
    },
    workurl: {
      type: String,
    },
    post: {
      type: String,
    },
    flash: {
      type: String,
    }
  })

  const Works = mongoose.model('Works', workSchema);

  module.exports = Works