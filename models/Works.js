const mongoose = require('mongoose');

const { Schema } = mongoose;

const workSchema = new Schema({
    userId: {
      type: Number,
    },
    myTattoos: {
      type: String,
    },
    post: {
      type: String,
    },
    artistTattoo: {
      type: String,
    },
  })

  const Works = mongoose.model('Works', workSchema);

  module.exports = Works