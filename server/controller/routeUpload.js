const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const User = require("../models/user");


 router.post('/upload', upload.single('image'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }

    res.status(200).json({
      success: true,
      message:"Uploaded!",
      data: result
    })
  })
});


// Retrieve image based on user email
router.get('/retrieve/:email', async function (req, res) {
    const userEmail = req.params.email;
  
    try {
      // Use async/await to handle the asynchronous operation
      const user = await User.findOne({ email: userEmail });
  
      if (!user || !user.profileImage) {
        return res.status(404).json({
          success: false,
          message: "User not found or no profile image available",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Image retrieved successfully",
        data: { imageUrl: user.profileImage },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error retrieving user image",
      });
    }
  });



module.exports = router;
