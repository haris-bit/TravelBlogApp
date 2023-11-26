const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "the-coding-company",
  api_key: "185786737263247",
  api_secret: "NgQZFO6PeaskqcYqX9m-GUL273w"
});

module.exports = cloudinary;