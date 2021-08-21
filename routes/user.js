const express = require("express");
const router = express.Router();
const TempProfile = require("../models/Temp-profile");

router.post("/create", async (req, res) => {
  try {
    // create username
    // check if it already exists in DB
    // if yes, create another, else store in DB
    res.status(200).json({ success: true, msg: "success" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;
