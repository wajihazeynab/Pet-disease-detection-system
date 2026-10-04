const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      required: true,
      type: String,
    },
    fcmToken: {
      type: String,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const User = model("users", userSchema);

module.exports = User;
