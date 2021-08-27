const express = require("express");
const router = express.Router();
const { querySalesDB } = require("../controllers/sale");

//  queery sales DB
router.get("/", querySalesDB);

module.exports = router;
