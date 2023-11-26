const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
  },
  country: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [200, "Bio should be less than 200 characters!"],
  },
  monthOfBirth: {
    type: String,
  },
  dayOfBirth: {
    type: Number,
  },
  yearOfBirth: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
