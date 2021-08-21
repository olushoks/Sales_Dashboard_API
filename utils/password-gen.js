const generateTempPassword = (length) => {
  let digit = "";

  for (let i = 1; i <= length; i++) {
    let num = Math.floor(Math.random() * 10);
    digit += num;
  }
  return `Welcome$${digit}`;
};

module.exports = { generateTempPassword };
