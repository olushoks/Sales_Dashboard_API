const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const setFieldsToSelect = require("../utils/setFieldsToSelect");
const setQueryObject = require("../utils/setQueryObject");

// get sales to a sppecific user
router.get("/", async (req, res) => {
  const {
    saleDate,
    storeLocation,
    couponUsed,
    purchaseMethod,
    gender,
    age,
    email,
    satisfaction,
    select,
  } = req.query;

  // get fields user wants to return from search
  let fieldsToSelect = setFieldsToSelect(select);
  // get fields user wants to query
  let queryObject = setQueryObject({
    saleDate,
    storeLocation,
    couponUsed,
    purchaseMethod,
    gender,
    age,
    email,
    satisfaction,
  });

  console.log(queryObject);
  console.log(fieldsToSelect);

  const sale = await Sale.find(queryObject).limit(5).select(fieldsToSelect);
  res.status(200).json({ sale, count: sale.length });
});

module.exports = router;
