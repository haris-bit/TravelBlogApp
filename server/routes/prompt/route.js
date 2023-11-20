const express = require("express");
const router = express.Router();
const User = require("./models/user");


router.get("/", async (req, res) => {
  res.send("Hello World");
  console.log("Hello");

})


router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
