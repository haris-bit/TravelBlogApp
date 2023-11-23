const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
  },
  surName: {
    type: String,
    required: [true, "Surname is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  country: {
    type: String,
    required: [true, "Country is required!"],
  },
  bio: {
    type: String,
    maxlength: [200, "Bio should be less than 200 characters!"],
  },
  birthdate: {
    month: {
      type: String,
      required: [true, "Month is required!"],
    },
    day: {
      type: Number,
      required: [true, "Day is required!"],
    },
    year: {
      type: Number,
      required: [true, "Year is required!"],
    },
  },
  profileImage: {
    type: String,
    // You can use this field to store the URL or file path of the profile image
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
