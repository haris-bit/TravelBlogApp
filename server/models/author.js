const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
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
    profileImage: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    }
});

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

module.exports = Author;
