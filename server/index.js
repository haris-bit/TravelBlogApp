// this will contain our MongoDB connection string
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const User = require("./models/user");
const Post = require("./models/post");
const multer = require("multer");
const path = require("path");
const { Console } = require("console");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadRoute = require('./controller/routeUpload');

// const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;



// Setting up our Middleware
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cors({
  origin: 'http://localhost:3000'
}));


// import multer configuration code
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//the route for image upload using cloudinary
app.use("/api/users" , uploadRoute);


app.post("/api/create", upload.single("profileImage"), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);

    // Check Cloudinary upload result
    if (!cloudinaryUpload || !cloudinaryUpload.secure_url) {
      throw new Error('Cloudinary upload failed');
    }

    // Create a new user with Cloudinary URL
    const newUser = {
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      bio: req.body.bio,
      monthOfBirth: req.body.monthOfBirth,
      dayOfBirth: req.body.dayOfBirth,
      yearOfBirth: req.body.yearOfBirth,
      profileImage: cloudinaryUpload.secure_url, // Store Cloudinary URL in profileImage field
    };

    // Add data validation here (if needed)

    // Save user data to MongoDB
    const data = await User.create(newUser);

    // Respond with the user data (or whatever response you need)
    res.json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred: " + error.message });
  } finally {
    // Optionally, you may want to delete the local file after uploading to Cloudinary
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});



/** OLD /api/create API End point    **/
// // api to register a new account
// app.post("/api/create", upload.single("profileImage"), async (req, res) => {
//   try {
//     const newUser = {
//       firstName: req.body.firstName,
//       surname: req.body.surname,
//       email: req.body.email,
//       password: req.body.password,
//       country: req.body.country,
//       bio: req.body.bio,
//       monthOfBirth: req.body.monthOfBirth,
//       dayOfBirth: req.body.dayOfBirth,
//       yearOfBirth: req.body.yearOfBirth,
//       profileImage: req.file.path,
//     };

//     // Add data validation here (if needed)

//     const data = await User.create(newUser);
//     res.json(data);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "An error occurred: " + error.message });
//   }
// });


// get the user based on the email

app.get("/api/user/:email", async (req, res) => {
  try {
    const emailParam = req.params.email;
    // find the user based on the email

    User.findOne({ email: emailParam }).then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json("No entry exists");
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the user." });
  }
});


// first get the first name, surname, bio and profile image by searching the user and then update the user profile first name, surname, bio and profile image

app.put("/api/user/profile/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Assuming your User model has a method like findByEmail to find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    else {
      const userId = user._id;
      const firstName = req.body.firstName;
      const surname = req.body.surname;
      const bio = req.body.bio;

      console.log("Details from the form");
      console.log("First name is " + firstName);
      console.log("Surname is " + surname);
      console.log("Bio is " + bio);

      User.findByIdAndUpdate(userId, { firstName: firstName, surname: surname, bio: bio }, { new: true })
        .then((user) => {
          console.log("User updated successfully");
          res.json(user);
        })
        .catch((err) => {
          res.json(err);
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});

app.put("/api/user/account/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Assuming your User model has a method like findByEmail to find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    else {
      const email = req.body.email;
      const userId = user._id;

      console.log("Details from the form");
      console.log("Email is " + email);

      User.findByIdAndUpdate(userId, { email: email }, { new: true })
        .then((user) => {
          console.log("User updated successfully");
          res.json(user);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});

app.put("/api/user/security/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Assuming your User model has a method like findByEmail to find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    else {
      const password = req.body.password;
      const userId = user._id;

      console.log("Details from the form");
      console.log("Password is " + password);

      User.findByIdAndUpdate(userId, { password: password }, { new: true })
        .then((user) => {
          console.log("User updated successfully");
          res.json(user);
        })
        .catch((err) => {
          res.json(err);
        });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
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




app.post("/api/post/create", upload.single("attachment"), async (req, res) => {
  try {

    console.log("Inside the post create api");
    console.log(req.body);

    // Upload the attachment to Cloudinary
    const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path);

    // Check Cloudinary upload result
    if (!cloudinaryUpload || !cloudinaryUpload.secure_url) {
      throw new Error('Cloudinary upload failed');
    }

    // Create a new post with Cloudinary URL
    const newPost = {
      username: req.body.username,
      email: req.body.email,
      description: req.body.description,
      attachment: cloudinaryUpload.secure_url, // Store Cloudinary URL in attachment field
    };

    // Add data validation here (if needed)

    // Save post data to MongoDB
    const data = await Post.create(newPost);

    // Respond with the post data (or whatever response you need)
    res.json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "An error occurred: " + error.message });
  } finally {
    // Optionally, you may want to delete the local file after uploading to Cloudinary
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});



/** This is the OLD API **/
// app.post("/api/post/create", upload.single("attachment"), async (req, res) => {
//   try {
//     console.log("Inside the post create api");
//     const newPost = {
//       username: req.body.username,
//       email: req.body.email,
//       description: req.body.description,
//       attachment: req.file.path
//     };


//     const data = await Post.create(newPost);
//     res.json(data);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ error: "An error occurred: " + error.message });
//   }
// });


// api to find all posts (GET)
app.get("/api/posts", async (req, res) => {
  try {
    // I want to sort the posts by the createdAt date
    const data = await Post.find({}).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching posts. " });
  }
});


app.put("/like-post/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true })
      .then((post) => {
        console.log("Post updated successfully");
        res.json(post);
      })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});


// api for creating a comment
app.post("/api/post/comment/:postId/:username", async (req, res) => {
  try {
    const postId = req.params.postId;
    const username = req.params.username;
    const comment = req.body.comment;

    const newComment = {
      username: username,
      comment: comment
    };

    Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { new: true })
      .then((post) => {
        console.log("Comment added successfully");
        res.json(post);
      }
      )
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});


// get all comments for a post using the post id
app.get("/api/post/comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    Post.findById(postId)
      .then((post) => {
        console.log("Comments fetched successfully");
        res.json(post.comments);
      })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the user profile." });
  }
});










// api to login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.json(user);
        } else {
          res.json({ message: 'Password does not match' });
        }
      } else {
        res.json({ message: 'User not found' });
      }
    }
    )
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