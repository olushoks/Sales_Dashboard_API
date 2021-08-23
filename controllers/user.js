const TempProfile = require("../models/Temp-profile");
const { generateUsername } = require("../utils/username-gen");
const { generateTempPassword } = require("../utils/password-gen");
const superUserAccessCode = process.env.SUPER_USER_ACCESS_CODE;

// create temp user profile controller
const createTempUserProfile = async (req, res) => {
  try {
    let { accessCode, firstName, lastName } = req.body;

    // check if user has valid access code
    if (String(accessCode) !== superUserAccessCode) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    // create username
    const username = await generateUsername(firstName, lastName, "");
    // generate temp password
    const password = generateTempPassword(4);

    // create temp profile document
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
};

module.exports = {
  createTempUserProfile,
};
