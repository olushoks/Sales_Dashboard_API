const convertStrToArr = require("./strToArray");

const setQueryObject = ({
  saleDate,
  storeLocation,
  couponUsed,
  purchaseMethod,
  gender,
  age,
  email,
  satisfaction,
}) => {
  const queryObject = {};

  if (gender) {
    queryObject["customer.gender"] = gender;
  }

  if (age) {
    queryObject["customer.age"] = JSON.parse(age);
  }

  if (email) {
    queryObject["customer.email"] = email;
  }

  if (satisfaction) {
    queryObject["customer.satisfaction"] = JSON.parse(satisfaction);
  }

  if (saleDate) {
    const dates = saleDate.split(":");

    if (dates.length === 1) {
      let from = new Date(
        new Date(dates[0]).setHours(00, 00, 00) + 24 * 60 * 60 * 1000
      );
      let to = new Date(
        new Date(dates[0]).setHours(23, 59, 59) + 24 * 60 * 60 * 1000
      );

      queryObject.saleDate = {
        $gte: from,
        $lte: to,
      };
    }

    if (dates.length === 2) {
      let [from, to] = dates;

      from = new Date(
        new Date(from).setHours(23, 59, 59) + 24 * 60 * 60 * 1000
      );
      to = new Date(new Date(to).setHours(23, 59, 59) + 24 * 60 * 60 * 1000);
      to = new Date(new Date(to).setHours(23, 59, 59));

      queryObject.saleDate = {
        $gte: from,
        $lte: to,
      };
    }
  }

  if (storeLocation) {
    queryObject.storeLocation = convertStrToArr(storeLocation);
  }

  if (couponUsed) {
    queryObject.couponUsed = couponUsed === "true" ? true : false;
  }

  if (purchaseMethod) {
    queryObject.purchaseMethod = convertStrToArr(purchaseMethod);
  }

  return queryObject;
};

module.exports = setQueryObject;
