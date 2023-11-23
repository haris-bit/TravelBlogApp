const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
  },
  surName: {
    type: String,
    required: [true, "Surname is required!"],
  },
  bio: {
    type: String,
    maxlength: [200, "Bio should not exceed 200 characters!"],
  },
  profileImage: {
    type: String, // Assuming you store the image URL
  },
});

const UserProfile = mongoose.models.UserProfile || mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
