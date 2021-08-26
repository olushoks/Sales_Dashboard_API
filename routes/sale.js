const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// get sales to a sppecific user
router.get("/", async (req, res) => {
  const query = req.query;

  const sale = await Sale.find({ "customer.email": query.email });
  res.status(200).json({ sale, count: sale.length });
});

module.exports = router;
