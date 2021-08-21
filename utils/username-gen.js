const TempProfile = require("../models/Temp-profile");

const generateUsername = async (firstN, lastN, modifier) => {
  let userName = `${firstN[0].toLowerCase()}${lastN.toLowerCase()}${modifier}`;

  modifier = Number(modifier + 1);

  // check if it already exists in DB
  let usernameInDB = await TempProfile.findOne({ userName });

  // If no, return
  if (usernameInDB === null) {
    console.log(userName);
    return userName;
  }

  // If yes, generate another
  generateUsername(firstN, lastN, modifier);
};

module.exports = { generateUsername };
