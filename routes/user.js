const express = require("express");
const router = express.Router();
const TempProfile = require("../models/Temp-profile");
const User = require("../models/User");
const { generateUsername } = require("../utils/username-gen");
const { generateTempPassword } = require("../utils/password-gen");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { createAccessJWT, createRefreshJWT } = require("../helper/jwt");
const { createTempUserProfile, userLogin } = require("../controllers/user");

// create user temporary profile
router.post("/create", createTempUserProfile);

// log in
router.post("/", userLogin);

// initial account set up
router.post("/setup/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    const {
      firstName,
      lastName,
      username,
      password: tempPass,
    } = await TempProfile.findById(userID);

    const {
      oldPassword,
      password: plainPassword,
      securityQuestions,
    } = req.body;

    // check if temp pass matches pass from request
    if (tempPass !== oldPassword) {
      return res.status(400).json({ success: false, msg: "Invalid password" });
    }

    // hash password
    const newPassword = await hashPassword(plainPassword);

    const userProfile = await User.create({
      firstName,
      lastName,
      username,
      password: newPassword,
      securityQuestions,
    });

    // delete user from temp profile collection
    await TempProfile.findByIdAndDelete(userID);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;
