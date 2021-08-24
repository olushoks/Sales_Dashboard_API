const express = require("express");
const router = express.Router();
const {
  createTempUserProfile,
  userLogin,
  accountSetUp,
} = require("../controllers/user");

// create user temporary profile
router.post("/create", createTempUserProfile);

// log in
router.post("/", userLogin);

// initial account set up
router.post("/setup/:userID", accountSetUp);

module.exports = router;
