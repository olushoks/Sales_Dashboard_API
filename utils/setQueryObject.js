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
    queryObject.saleDate = saleDate;
  }

  if (storeLocation) {
    queryObject.storeLocation = convertStrToArr(storeLocation);
  }

  if (couponUsed) {
    queryObject.couponUsed = couponUsed;
  }

  if (purchaseMethod) {
    queryObject.purchaseMethod = convertStrToArr(purchaseMethod);
  }

  return queryObject;
};

module.exports = setQueryObject;
