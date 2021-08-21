const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempProfileSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    minLength: 2,
  },
  password: {
    type: String,
    minLength: 6,
  },
});

module.exports = mongoose.model("Temp_Profile", tempProfileSchema);
