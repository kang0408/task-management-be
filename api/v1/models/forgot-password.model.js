const mongoose = require("mongoose");

const forgotPasswordSchema = mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expire: 180,
    },
  },
  {
    timeStamps: true,
  }
);

const forgotPassword = mongoose.model(
  "fotgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);

module.exports = forgotPassword;
