// this will contain our MongoDB connection string
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const User = require("./models/user");
const UserProfile = require("./models/userProfile");
const multer = require("multer");


// const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;




// Setting up our Middleware
connectDB();
app.use(cors());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use("/uploads", express.static("uploads"));



// import multer configuration code
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// User.create(req.body)
// .then((UserModel) => res.json(UserModel))
// .catch((err) => res.json(err));


// api to register a new account
app.post("/api/create", upload.single("profileImage"), async (req, res) => {
  try {

    console.log(req.body);
    console.log(req.file);

    const newUser = new User({
      firstName: req.body.firstName,
      surName: req.body.surName,
      email: req.body.email, // Add the email field
      password: req.body.password, // Add the password field
      country: req.body.country, // Add the country field
      bio: req.body.bio,
      birthdate: {
        month: req.body.birthdate.month,
        day: req.body.birthdate.day,
        year: req.body.birthdate.year,
      },
      profileImage: req.file.filename,
    });


    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the new user" });
  }
});







// api to find all users (GET)
app.get("/api/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching users. "});
  }
});


// api to login
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


// api to create account
app.post("/register", (req, res) => {
  User.create(req.body)
    .then((UserModel) => res.json(UserModel))
    .catch((err) => res.json(err));
});


// for creating a user profile
// app.post("/create-profile", (req, res) => {
//   UserProfile.create(req.body)
//     .then((ProfileModel) => res.json(ProfileModel))
//     .catch((err) => res.json(err));
// });



// to view a single profile based on the profileId saved in mongoDB
// app.get("/api/profile/:id", async (req, res) => {
//   try {
//     const idParam = req.params.id;

//     console.log(idParam);

//     const data = await UserProfile.findOne({ _id: slugParam });
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching the profile." });
//   }
// });












// api to update an existing profile (this might not work because the profileId might not exist)
app.put("/api/profile", upload.single("thumbnail"), async (req, res) => {
  try {

    // a default mongoDB id created for each user
    const profileId = req.body.profileId;

    const updateUserProfile = {
      firstName: req.body.firstName,
      surName: req.body.surName,
      bio: req.body.bio,
      profileImage: req.body.profileImage,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }


    await UserProfile.findByIdAndUpdate(profileId, updateBook);
    res.status(201).json({ message: "User Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the Profile" });
  }
});


// an api to delete an existing user profile
app.delete("/api/profile/:id", async (req, res) => {
  const profileId = req.params.id;

  try {
    await UserProfile.deleteOne({ _id: profileId });
    res.json("Profile deleted!" + req.body.profileId);
  } catch (error) {
    res.json(error);
  }

})





app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});