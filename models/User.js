const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');



const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  tattooType: {
    type: String,
  },
  flash: [{
    type: String
  }],
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  bio: {
    type: String,
  },
  social: {
    type: String,
  },
  style: [{
    type: String,
  }],
  profilePicture: {
    type: String,
  },
  tattoo: [{
    type: String,
  }]
});



// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
