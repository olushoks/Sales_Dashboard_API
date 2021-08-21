const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    minLength: 8,
  },
  securityQuestions: [
    {
      question: {
        type: String,
        minLength: 10,
        maxlength: 100,
        required: [true, "please enter a security question"],
      },
      answer: {
        type: String,
        maxlength: 20,
        required: [true, "please enter a security question"],
      },
    },
  ],
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    issuedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
