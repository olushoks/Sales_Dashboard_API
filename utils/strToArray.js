const convertStrToArr = (str) => {
  str = str.split("-");
  return { $in: str };
};

module.exports = convertStrToArr;
