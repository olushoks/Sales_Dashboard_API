const express = require("express");
const router = express.Router();
const TempProfile = require("../models/Temp-profile");
const User = require("../models/User");
const { generateUsername } = require("../utils/username-gen");
const { generateTempPassword } = require("../utils/password-gen");
const { hashPassword } = require("../helper/bcrypt");

router.post("/create", async (req, res) => {
  try {
    let { accessCode, firstName, lastName } = req.body;

    // check if user has valid access code
    if (String(accessCode) !== process.env.SUPER_USER_ACCESS_CODE) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    // create username
    const username = await generateUsername(firstName, lastName, "");

    // generate temp password
    const password = generateTempPassword(4);

    const tempProfile = await TempProfile.create({
      firstName,
      lastName,
      username,
      password,
    });

    res.status(200).json({ success: true, msg: "success", tempProfile });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await TempProfile.findOne({ username });

    if (user) {
      if (user.password !== password) {
        return res
          .status(403)
          .json({ success: false, msg: "Invald username or password" });
      }
      return res
        .status(200)
        .json({ sucess: true, msg: "Kindly Complete your account set up!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

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
