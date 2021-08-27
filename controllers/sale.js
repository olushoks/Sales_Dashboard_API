const Sale = require("../models/Sale");
const setFieldsToSelect = require("../utils/setFieldsToSelect");
const setQueryObject = require("../utils/setQueryObject");

const querySalesDB = async (req, res) => {
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
    limit = 0,
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

  const sale = await Sale.find(queryObject)
    .limit(+limit)
    .select(fieldsToSelect);
  res.status(200).json({ sale, count: sale.length });
};

module.exports = { querySalesDB };