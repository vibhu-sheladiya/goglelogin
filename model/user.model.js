const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    // user name
    userName: {
      type: String,
      trim: true,
    },
    // user email
    email: {
      type: String,
      trim: true,
    },
    // phone of the user
    phone: {
      type: Number,
      trim: true,
    },
    // password of the user
    password: {
      type: String,
      trim: true,
    },
    // address of the user
    address: {
      type: String,
      trim: true,
    },
    // country india of the user
    country_india: {
      type: String,
      default: "india",
    },
    // role of the user
    role: {
      type: String,
      default: "user", // 1-admin  2 -user   3-superadmin
    },
    otp: {
      type: String,
    },
    token: {
      type: String,
    },
    newPassword:{
      type :String,
    }
  },
  { timestamps: true }
);


const User = mongoose.model("user", userSchema);
module.exports = User;
