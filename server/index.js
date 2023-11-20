// this will contain our MongoDB connection string
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const User = require("./models/user");


// const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;




// Setting up our Middleware
connectDB();
app.use(cors());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());



app.get("/api/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching users. "});
  }
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({email: email}).then(user => {
    if(user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password was incorrect");
      }
    } else {
      res.json("No entry exists");
    }
  })
})


app.post("/register", (req, res) => {
  User.create(req.body)
    .then((UserModel) => res.json(UserModel))
    .catch((err) => res.json(err));
});




app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});