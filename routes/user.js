const express = require("express");
const router = express.Router();
const TempProfile = require("../models/Temp-profile");
const { generateUsername } = require("../utils/username-gen");
const { generateTempPassword } = require("../utils/password-gen");

router.post("/create", async (req, res) => {
  try {
    let { accessCode, firstName, lastName } = req.body;

    // check if user has valid access code
    if (String(accessCode) !== process.env.SUPER_USER_ACCESS_CODE) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    // create username
    const userName = await generateUsername(firstName, lastName, "");

    // generate temp password
    const tempPass = generateTempPassword(4);

    const tempProfile = await TempProfile.create({
      firstName,
      lastName,
      userName,
      tempPass,
    });

    res.status(200).json({ success: true, msg: "success", tempProfile });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userName } = req.body;
    let user = await TempProfile.findOne({ userName });

    if (user) {
      return res
        .status(200)
        .json({ sucess: true, msg: "Kindly Complete your account set up!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;
