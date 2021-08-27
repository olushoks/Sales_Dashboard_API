const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

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
  let selectOptions = select || "";
  selectOptions = selectOptions.split("-");
  selectOptions = selectOptions.join(" ");

  // get fields user wants to query
  const queryObject = {};

  if (gender) {
    queryObject["customer.gender"] = gender;
  }

  if (age) {
    queryObject["customer.age"] = +age;
  }

  if (email) {
    queryObject["customer.email"] = email;
  }
  if (satisfaction) {
    queryObject["customer.satisfaction"] = satisfaction;
  }

  if (saleDate) {
    queryObject.saleDate = saleDate;
  }

  if (storeLocation) {
    queryObject.storeLocation = storeLocation;
  }

  if (couponUsed) {
    queryObject.couponUsed = couponUsed;
  }

  if (purchaseMethod) {
    queryObject.purchaseMethod = purchaseMethod;
  }

  console.log(queryObject);
  console.log(selectOptions);

  const sale = await Sale.find(queryObject).limit(5).select(selectOptions);
  res.status(200).json({ sale, count: sale.length });
});

module.exports = router;
